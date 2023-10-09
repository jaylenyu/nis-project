<div align="center">
<img width="100%" alt="thumbnail" src="https://github.com/jaylenyu/nis-project/assets/124610396/b2a3aecb-f816-4c19-8683-f696d5f8f737">
</div>

<br/>

## 🌏 프로젝트

> 국가 정보 검색 시스템

<br />

### 배포링크 : <a href="https://nis-next.vercel.app">National Information System</a>

<br />
<br />
<br />

## ⚙️ 기술스택

<div>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/GoogleMaps-4285F4?style=flat-square&logo=GoogleMaps&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
</div>

<br />
<br />
<br />

## 📝 구현 기술

<br />

### 1. 메인페이지 정적 생성(Static Site Generation)
![ssr](https://github.com/jaylenyu/nis-project/assets/124610396/13126734-571a-43b5-8c1d-fcb380fe5914)

- getStaticProps를 활용해 페이지를 정적으로 빌드시에 생성
- 이미 생성된 HTML을 미리 가져와 SEO최적화 및 로딩 단축으로 사용자 경험 개선

<br />
<br />

### 2. 국가페이지 SSG와 ISR(Incremental Static Regeneration)적용
```typescript
export const getStaticPaths: GetStaticPaths = async () => {
  const codes = ["ABW", "AFG", "AGO", "AIA", "ALA"];
  const paths = codes.map(code => ({ params: { code } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { code } = context.params || {};

  if (typeof code === "string") {
    const country = await fetchCountry(code);
    if (country) {
      return {
        props: {
          country,
        },
        revalidate: 3,
      };
    }
  }

  return {
    notFound: true,
  };
};
```
- getStaticPaths를 사용하여 최 상단 5국가를 build시에 HTML을 미리 생성
- fallback을 이용하여 그 외 국가들은 ISR방식으로 생성 후 완전한 페이지를 제공
- revalidate를 사용하여 국가 데이터가 변경될 시, 3초마다 재생성할 수 있도록 설정
- 개발 기록 <a href="https://jaylenyu.tistory.com/51">자세히 보기<a>

<br />
<br />

### 2. 이미지 렌더링 최적화(Nextjs Image Tag - priority)
![image](https://github.com/jaylenyu/nis-project/assets/124610396/c4685e2b-424a-4b53-88f7-b39515a0a7f4)

- 이미지 최적화로 webp 변환
- priority를 활용하여 사용자의 viewport에서 Lazy loading 구현

<br />
<br />

### 3. Google Map API 구현
![Map](https://github.com/jaylenyu/nis-project/assets/124610396/a4ec70c5-64ce-4b4a-866a-7427f474ad3c)

- 렌더링과 동시에 Geocoder를 활용하여 좌표값 생성
- 해당 좌표를 이용하여 국가 위치 및 마커 생성
- 개발과정 및 기록 <a href="https://jaylenyu.tistory.com/58">자세히보기</a>

<br />
<br />

### 4. 검색바 사용자 경험 최적화
![searchBar](https://github.com/jaylenyu/nis-project/assets/124610396/36ae7bb7-5330-4de0-b1d8-fed14c70f9fb)

- 사용자의 검색값이 포함된 국가 리스트를 자동완성으로 구현
- 키보드로 자동완성 리스트에 접근 및 이동
- 자동완성 리스트 클릭 및 엔터로 input창에 리스트 자동삽입

<br />
<br />

### 5. meta 태그를 통한 SEO 최적화
![meta](https://github.com/jaylenyu/nis-project/assets/124610396/08242971-2e51-4ec1-bc7d-05209070b370)

- 메인페이지, 검색페이지, 국가페이지 별 meta태그 적용

<br />
<br />

### 6. 반응형 구현
![responsive2](https://github.com/jaylenyu/nis-project/assets/124610396/b03c0bbd-90a6-4649-97cf-ddbe4b8b422d)

- 데스크탑, 패드 및 모바일 반응형 레이아웃 구현

<br />
<br />
<br />

## 📅 개발 기간

> 2023.09.11 ~ 2023.09.17 (7일)

<br />
<br />
<br />

## 🗂️ 프로젝트 구조
```
.
├── 📁 components                       
│   ├── CountryItem.tsx                 
│   ├── CountryList.tsx                 
│   ├── Layout.tsx                      
│   ├── Loading.tsx                     
│   ├── SearchBar.tsx                   
│   └── Spinner.tsx                                   
│
├── 📁 pages                            
│   ├── 📁 api                         
│   ├── 📁 country
│   │   └── [code].tsx  
│   ├── 📁 search
│   │   └── index.tsx
│   ├── _app.tsx      
│   ├── _document.tsx 
│   └── index.tsx     
│
├── 📁 public         
│   ├── favicon.ico
│   └── thumbnail.png
│
├── 📁 styles                           
│   └── globals.css
│
├── 📁 types                            
│   └── components.ts
│
└── api.tsx        
```

<br />
<br />
<br />

## 📌 시작하기
```
# 로컬 환경에 Clone하기
git clone https://github.com/jaylenyu/nis-project.git

# 로컬 프로젝트 폴더로 이동하기
cd nis-project

# 디펜던시 설치하기
npm install

# 개발 서버 실행하기
npm run dev

# 로컬 서버 접속
http://localhost:3000
```
