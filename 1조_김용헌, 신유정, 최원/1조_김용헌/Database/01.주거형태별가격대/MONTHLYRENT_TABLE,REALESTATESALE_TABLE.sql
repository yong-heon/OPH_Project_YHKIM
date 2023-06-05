--monthlyrent 테이블 법정동 행정동으로 변환
UPDATE monthlyrent 
SET bjdong_nm = (
    SELECT md.bjdong_nm_hang
    FROM mappingdata md
    WHERE monthlyrent.bjdong_nm = md.bjdong_nm_law AND ROWNUM <= 1
)
WHERE EXISTS (
    SELECT 1
    FROM mappingdata
    WHERE monthlyrent.bjdong_nm = mappingdata.bjdong_nm_law
);

--REALESTATESALE 테이블 법정동 행정동으로 변환
UPDATE REALESTATESALE 
SET bjdong_nm = (
    SELECT md.bjdong_nm_hang
    FROM mappingdata md
    WHERE REALESTATESALE.bjdong_nm = md.bjdong_nm_law AND ROWNUM <= 1
)
WHERE EXISTS (
    SELECT 1
    FROM mappingdata
    WHERE REALESTATESALE.bjdong_nm = mappingdata.bjdong_nm_law
);

--REALESTATESALE 중복된 열 삭제
DELETE FROM REALESTATESALE a
WHERE ROWID > (SELECT MIN(ROWID) FROM REALESTATESALE b
  WHERE b.bjdong_nm = a.bjdong_nm
  and b.obj_amt = a.obj_amt);

--MONTHLYRENT 중복된 열 삭제
DELETE FROM MONTHLYRENT a
WHERE ROWID > (SELECT MIN(ROWID) FROM MONTHLYRENT b
  WHERE b.bjdong_nm = a.bjdong_nm
  and b.rent_area = a.rent_area
  and b.rent_fee = a.rent_fee);
select count(*) from REALESTATESALE;


--MONTHLYRENT(주거형태별 전월세 테이블)에서 주거형태와 계약형태에 따른 평균 가격
select sgg_nm, bjdong_nm, avg(rent_fee)
from monthlyrent
where house_gbn_nm = '연립다세대'
and rent_gbn = '월세' 
group by sgg_nm, bjdong_nm
order by bjdong_nm;

--REALESTATESALE TABLE(주거형태별 전월세 테이블)에서 주거형태와 계약형태에 따른 평균 가격
select sgg_nm, bjdong_nm, avg(obj_amt)
from REALESTATESALE
where house_type = '연립다세대'
group by sgg_nm, bjdong_nm
order by bjdong_nm;