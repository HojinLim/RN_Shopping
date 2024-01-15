# ``HJ MALL`` :tshirt:

<img src="https://capsule-render.vercel.app/api?type=waving&color=BDBDC8&height=150&section=footer" />

## 프로젝트 소개

다양한 옷을 구매할 수 있는 이커머스 옷 쇼핑몰 사이트입니다. 앱 버전으로 제작하였습니다.

**배포 링크**: https://

***

### :boxing_glove: 개발기간

**(23.11.20~ ing)**

<br/><br/>

## :sunflower: Stacks

### Version Control
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white) ![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Front-End
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/react_router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/react_query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">

### Back-End
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"/>

### Deployment
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>



<br/><br/>

## 화면 구성

| 작업            | 미리보기 |
| --------------- | ------- |
| **메인 페이지** | <img src="https://github.com/HojinLim/RN_Shopping/assets/69897998/54dcec80-99ec-4aa2-a4d4-999282d8976b" alt="메인페이지" width="300" height="550"> |
| **상세 페이지** | <img src="https://github.com/HojinLim/RN_Shopping/assets/69897998/f48f298c-885f-4252-b267-a27d8124d786" alt="로그인페이지" width="300" height="550"> |
| **내 정보 페이지** | <img src="https://github.com/HojinLim/RN_Shopping/assets/69897998/28254e73-7c37-4a2b-b9ca-e2fd261a292e" alt="장바구니" width="300" height="550"> |
| **좋아요 페이지** | <img src="https://github.com/HojinLim/RN_Shopping/assets/69897998/11a93bea-876c-45d8-86b8-d2d0d88b76fb" alt="삭제" width="300" height="550"> |
| **장바구니 페이지** | <img src="https://github.com/HojinLim/RN_Shopping/assets/69897998/c53c4841-58fd-45a0-a5bb-bc1f77296d34" alt="제품 추가" width="300" height="550"> |




---

<br/><br/>



## :partying_face: 주요 기능

### 메인페이지

- FireStore Dababase와 Storage에서 사진과 제품 정보를 가져옵니다.
- 카테고리별로 데이터를 나눠서 품목을 볼 수 있습니다.

### 상세 페이지

- 상세 제품 정보를 볼 수 있습니다.
- 로그인한 현재 회원이 좋아요, 장바구니로 제품의 상태에 영향을 줍니다.

### 좋아요, 장바구니 페이지

- 좋아요 및 장바구니 추가한 제품을 확인하고 삭제할 수 있습니다.


### 관리자 페이지

- 관리자 권한이 있는 회원으로 로그인 시,  제품을 관리할 수 있는 페이지입니다.
- .env 파일에 권한있는 계정 정보 저장.
- 제품을 등록하면 해당 제품의 정보를 Firebase 백앤드에 저장합니다.



<br/><br/>

## :sunglasses:주요 파일 및 폴더
#### 📜App.tsx: 화면 전환을 위한 Navigator를 구현한 파일입니다.
#### 📜useProductQuery.tsx, useUserLikeQuery.tsx: 유저가 상품에 대한 상호작용을 react-query문으로 제어할 수 있는 파일들입니다.
#### 📜Router.tsx: 사용할 때 페이지를 이동할 때 필요한 라이브러리가 담긴 파일입니다.
#### 📜firebase.ts: Firebase 환경 설정 파일입니다.
#### 📜dataManage.ts: DB에 담긴 전체 상품 데이터와 유저의 좋아요, 장바구니 리스트를 가져오는 비동기 함수들이 있습니다.
#### 📜ProductDetailPage.ts: 제품의 상세 정보들을 가져오고 좋아요, 장바구니 유무에 따라 정보를 관리 해줍니다.


<br/><br/>


## :clipboard: 수행할 일
    - 스토어에 배포
    - 카카오 로그인 구현
    - 여러 기기에서도 안정적으로 작동 되게끔 화면 디자인.

<br/><br/>
