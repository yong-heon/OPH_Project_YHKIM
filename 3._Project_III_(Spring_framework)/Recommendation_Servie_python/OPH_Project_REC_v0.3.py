## Library import
import pandas as pd, numpy as np
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from math import *

## 유클리디안 거리를 구하기 위한 함수
def euclidean_distance(A, B):
    return np.sqrt(np.sum((A-B)**2))


## 지역데이터 불러오기
from sqlalchemy import create_engine

# 연결 정보
connection_string = "oracle+cx_oracle://scott:tiger@localhost:1521/xe"
engine = create_engine(connection_string)

# 연결 얻기
connection = engine.connect()

# SQL 쿼리 실행
query = "SELECT * FROM BJDONG_TOTAL"
city = pd.read_sql(query, connection)

# 연결 닫기
connection.close()

import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding="utf-8")
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding="utf-8")


## 유저 정보 받아서 변수로 설정
import sys

username = "임시유저"
contract = sys.argv[1]
house_type = sys.argv[2]
deposit = int(sys.argv[3])
monthly = int(sys.argv[4])
prefer1 = sys.argv[5]
prefer2 = sys.argv[6]
prefer3 = sys.argv[7]



# 보증금(전세금) 상/하한 및 월세 상/하한값 설정
deposit_diff = 500
monthly_diff = 10

# 유저 정보를 바탕으로 데이터프레임으로 변환
user = pd.DataFrame({'사용자':[username], '계약분류':[contract],'주거형태':[house_type],'보증금(전세금)':[deposit],'월세':[monthly],'선호1순위':[prefer1],'선호2순위':[prefer2],'선호3순위':[prefer3]})



# ## 데이터 전처리
# ---
#   - 유사도 계산 시, 결측값이 존재하면 안되므로 결측치는 중앙값으로 대체

# In[ ]:


# 인구전입량, 청년1인가구수 포함 가격과 관련된 변수들은 모두 수치형이므로 각 변수별 중앙값으로 결측값 대체(중앙값)
for col in city.columns[2:-4]:
    city[col] = city[col].fillna(city[col].median())



# ## 유사도 기반 지역 추천

# 지역 데이터를 처리하기 위해 city_tmp 생성
city_tmp = city.copy()

# 현재 사용자의 원하는 계약 분류 및 주거 형태 추출
contract = user['계약분류'].values[0]
house_type = user['주거형태'].values[0]

# 지역 데이터에서 사용자의 계약분류 및 주거형태와 관련있는 변수만 추출
tmp = city.loc[:,[i for i in city.columns if (contract in i) & (house_type in i)]].copy()

# 계약 분류가 월세인 경우
if contract == "월세":

    # 월세인 경우, 보증금 및 월세에 대한 단위 통일 후, 사용자가 입력한 값과 지역간 유클리드 거리 계산(distance)
    scaler = MinMaxScaler()
    scaled = pd.DataFrame(scaler.fit_transform(tmp))
    user_scaled = scaler.transform(np.reshape(user[['보증금(전세금)','월세']].values,(-1,2)))[0]
    distance = scaled.apply(lambda x : euclidean_distance(x,user_scaled),axis=1)
    city_tmp['distance'] = distance

    # 사용자의 보증금에 대한 상/하한 범위 내 포함되면서 월세에 대한 상/하한 내 속하는 지역만 추출 후, 유클리드 거리가 짧은 순으로 정렬
    city_tmp = city_tmp.loc[((user['보증금(전세금)'].values[0]-deposit_diff <= city_tmp[tmp.columns[0]]) & (city_tmp[tmp.columns[0]]<=user['보증금(전세금)'].values[0]+deposit_diff)) & ((user['월세'].values[0]-monthly_diff <= city_tmp[tmp.columns[1]])& (city_tmp[tmp.columns[1]] <= user['월세'].values[0]+monthly_diff))]
    city_tmp = city_tmp.sort_values(['distance']).reset_index(drop=True)

    # 선호 순위가 인구인 경우, 인구전입량으로 나머지는 해당 순위가 속하는 컬럼을 기준으로하여, 선호 1순위부터 3순위 순서로 선호도가 많은 수로 지역 정렬
    if user['선호1순위'][0] == "인구":
        sort_col_2 = [i for i in city_tmp.columns if user['선호2순위'][0] in i][0]
        sort_col_3 = [i for i in city_tmp.columns if user['선호3순위'][0] in i][0]
        city_tmp = city_tmp.sort_values(['인구전입량',sort_col_2,sort_col_3],ascending=False)
        city_tmp = city_tmp.loc[:,['자치구','행정동',tmp.columns[0],tmp.columns[1],'인구전입량',sort_col_2,sort_col_3]].reset_index(drop=True)
    elif user['선호2순위'][0] == "인구":
        sort_col_1 = [i for i in city_tmp.columns if user['선호1순위'][0] in i][0]
        sort_col_3 = [i for i in city_tmp.columns if user['선호3순위'][0] in i][0]
        city_tmp = city_tmp.sort_values([sort_col_1,'인구전입량',sort_col_3], ascending=False)
        city_tmp = city_tmp.loc[:,['자치구','행정동',tmp.columns[0],tmp.columns[1],sort_col_1,'인구전입량',sort_col_3]].reset_index(drop=True)
    elif user['선호3순위'][0] == "인구":
        sort_col_1 = [i for i in city_tmp.columns if user['선호1순위'][0] in i][0]
        sort_col_2 = [i for i in city_tmp.columns if user['선호2순위'][0] in i][0]
        city_tmp = city_tmp.sort_values([sort_col_1,sort_col_2,'인구전입량'], ascending=False)
        city_tmp = city_tmp.loc[:,['자치구','행정동',tmp.columns[0],tmp.columns[1],sort_col_1,sort_col_2,'인구전입량']].reset_index(drop=True)
    else:
        sort_col_1 = [i for i in city_tmp.columns if user['선호1순위'][0] in i][0]
        sort_col_2 = [i for i in city_tmp.columns if user['선호2순위'][0] in i][0]
        sort_col_3 = [i for i in city_tmp.columns if user['선호3순위'][0] in i][0]
        city_tmp = city_tmp.sort_values([sort_col_1,sort_col_2,sort_col_3], ascending=False)
        city_tmp = city_tmp.loc[:,['자치구','행정동',tmp.columns[0],tmp.columns[1],sort_col_1,sort_col_2,sort_col_3]].reset_index(drop=True)


# 계약 분류가 전세/매매인 경우
else:

    # 전세/매매인경우 사용자의 보증금과 지역별 매매가/전세가의 차이의 절대값을 거리로 간주
    city_tmp['distance'] = abs(city_tmp[tmp.columns[0]] - user['보증금(전세금)'].values[0])

    # 사용자의 보증금에 대한 상/하한 범위 내 포함되면서 거리가 짧은 순으로 정렬
    city_tmp = city_tmp.loc[((user['보증금(전세금)'].values[0]-deposit_diff <= city_tmp[tmp.columns[0]]) & (city_tmp[tmp.columns[0]]<=user['보증금(전세금)'].values[0]+deposit_diff))]
    city_tmp = city_tmp.sort_values(['distance']).reset_index(drop=True)

    # 선호 순위가 인구인 경우, 인구전입량으로 나머지는 해당 순위가 속하는 컬럼을 기준으로하여, 선호 1순위부터 3순위 순서로 선호도가 많은 수로 지역 정렬
    if user['선호1순위'][0] == "인구":
        sort_col_2 = [i for i in city_tmp.columns if user['선호2순위'][0] in i][0]
        sort_col_3 = [i for i in city_tmp.columns if user['선호3순위'][0] in i][0]
        city_tmp = city_tmp.sort_values(['인구전입량',sort_col_2,sort_col_3],ascending=False)
        city_tmp = city_tmp.loc[:,['자치구','행정동',tmp.columns[0],'인구전입량',sort_col_2,sort_col_3]].reset_index(drop=True)
    elif user['선호2순위'][0] == "인구":
        sort_col_1 = [i for i in city_tmp.columns if user['선호1순위'][0] in i][0]
        sort_col_3 = [i for i in city_tmp.columns if user['선호3순위'][0] in i][0]
        city_tmp = city_tmp.sort_values([sort_col_1,'인구전입량',sort_col_3], ascending=False)
        city_tmp = city_tmp.loc[:,['자치구','행정동',tmp.columns[0],sort_col_1,'인구전입량',sort_col_3]].reset_index(drop=True)
    elif user['선호3순위'][0] == "인구":
        sort_col_1 = [i for i in city_tmp.columns if user['선호1순위'][0] in i][0]
        sort_col_2 = [i for i in city_tmp.columns if user['선호2순위'][0] in i][0]
        city_tmp = city_tmp.sort_values([sort_col_1,sort_col_2,'인구전입량'], ascending=False)
        city_tmp = city_tmp.loc[:,['자치구','행정동',tmp.columns[0],sort_col_1,sort_col_2,'인구전입량']].reset_index(drop=True)
    else:
        sort_col_1 = [i for i in city_tmp.columns if user['선호1순위'][0] in i][0]
        sort_col_2 = [i for i in city_tmp.columns if user['선호2순위'][0] in i][0]
        sort_col_3 = [i for i in city_tmp.columns if user['선호3순위'][0] in i][0]
        city_tmp = city_tmp.sort_values([sort_col_1,sort_col_2,sort_col_3], ascending=False)
        city_tmp = city_tmp.loc[:,['자치구','행정동',tmp.columns[0],sort_col_1,sort_col_2,sort_col_3]].reset_index(drop=True)

    # city_tmp = city_tmp.loc[:,[tmp.columns[0],sort_col_1, sort_col_2, sort_col_3]].reset_index(drop=True)

    city_tmp_json = city_tmp.to_json(orient="records")
    print(city_tmp_json)






