--monthlyrent ���̺� ������ ���������� ��ȯ
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

--REALESTATESALE ���̺� ������ ���������� ��ȯ
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

--REALESTATESALE �ߺ��� �� ����
DELETE FROM REALESTATESALE a
WHERE ROWID > (SELECT MIN(ROWID) FROM REALESTATESALE b
  WHERE b.bjdong_nm = a.bjdong_nm
  and b.obj_amt = a.obj_amt);

--MONTHLYRENT �ߺ��� �� ����
DELETE FROM MONTHLYRENT a
WHERE ROWID > (SELECT MIN(ROWID) FROM MONTHLYRENT b
  WHERE b.bjdong_nm = a.bjdong_nm
  and b.rent_area = a.rent_area
  and b.rent_fee = a.rent_fee);
select count(*) from REALESTATESALE;


--MONTHLYRENT(�ְ����º� ������ ���̺�)���� �ְ����¿� ������¿� ���� ��� ����
select sgg_nm, bjdong_nm, avg(rent_fee)
from monthlyrent
where house_gbn_nm = '�����ټ���'
and rent_gbn = '����' 
group by sgg_nm, bjdong_nm
order by bjdong_nm;

--REALESTATESALE TABLE(�ְ����º� ������ ���̺�)���� �ְ����¿� ������¿� ���� ��� ����
select sgg_nm, bjdong_nm, avg(obj_amt)
from REALESTATESALE
where house_type = '�����ټ���'
group by sgg_nm, bjdong_nm
order by bjdong_nm;