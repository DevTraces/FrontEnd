![](https://velog.velcdn.com/images/jiseung/post/eb6f06c5-13bc-4346-af1d-4f9962b6139f/image.png)

## 🖼 Overview

> ❓ 같은 취미를 가지고 있는 사람들끼리 만나면 얘기할 수 있는게 많아지고, 더 깊은 이야기를 나눌 수 있지 않을까?

>💡 특정 테마를 주제로 **SNS**를 만들어보자! → **그림 SNS**

<img width="100px" src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d3156e99-4f78-4dd4-8b7b-f368f4c3050a/qwerqwer.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230309T022027Z&X-Amz-Expires=86400&X-Amz-Signature=758495cff74222b9155d45d648acaea14bef6302c1cc9f18a31947e2ef6f5f0e&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22qwerqwer.png%22&x-id=GetObject" />

### [ArtBubble]

예술을 의미하는 단어  **Art**와 SNS 알고리즘에 의해 묶인 사람들을 뜻하는 은어  **Bubble**의 합성어

### [로고]

<img width="100px" src="https://velog.velcdn.com/images/jiseung/post/567372c3-6dcf-4f9c-8413-373b97ae719b/image.png" />

**공유**의 의미를 가지는 아이콘 형태에
새로움을 상징하는  **초록,**  자유로움을 상징하는  **파랑,**  창의성을 상징하는  **보라**를 통해 우리 서비스의 성격을 나타냅니다.
또한 보라색에서 새롭게 나오고 있는 방울은 또 다른 가능성을 의미합니다.

## 📖 Introduction

### 🛠️ Frontend Tech Stack

![](https://velog.velcdn.com/images/jiseung/post/71071f96-90f2-4de2-83e4-d6f5f062bc32/image.png)

-   Framework:  `Next.js`
-   Language:  `TypeScript`
-   Design System :  `Chakra UI`
-   Login:  `JWT`,  `OAuth 2.0`
-   State Management:  `Recoil`  `React Query(Tanstack Query v4)`
-   Data Fetching :  `Axios`  `React Query(Tanstack Query v4)`
-   E2E Test :  `Cypress`
-   Deploy :  `Vercel`
-   CI/CD :  `Github Actions`  `Husky`
-   Design Tools :  `Figma`  `InVision`
-   Communication Tools :  `Notion`  `Gather`  `Slack`


### 💻 주요 기능


🔑  **계정**
<table>
  <tr>
    <td max-width="500px">
      <img src="https://velog.velcdn.com/images/jiseung/post/3208d91f-0521-406b-9ba4-8555c674cf58/image.png" />
    </td>
    <td>
      <b>회원가입</b> - 이메일 인증/카카오를 통해 회원가입을 할 수 있습니다.<br>
      <b>로그인</b>- 이메일 및 소셜 로그인(카카오)을 할 수 있습니다.<br>
      <b>로그아웃</b> - 로그아웃을 할 수 있습니다.<br>
      <b>비밀번호 재설정</b> - 비밀번호를 변경하거나 잊어버린 경우 재설정할 수 있습니다.<br>
      <b>회원탈퇴</b> - 탈퇴가 가능하고, 탈퇴한 유저는 재가입이 가능합니다.<br>
      <b>프로필</b> - 유저의 정보(프로필 이미지, 이름, 닉네임, 자기소개)를 등록/수정할 수 있습니다.
    </td>
  </tr>
</table>

👤  **프로필**

<table>
  <tr>
    <td max-width="500px" >
      <img src="https://velog.velcdn.com/images/jiseung/post/1f7bfea2-5403-410e-9964-da4752bffc70/image.png" />
    </td>
    <td>
      <b>유저 정보</b> - 프로필 이미지, 이름, 닉네임, 자기소개, 게시글 개수, 팔로잉/팔로워 수를 볼 수 있습니다.<br>
      <b>게시글</b> - 유저가 작성한 게시글 목록을 볼 수 있습니다.<br>
      <b>팔로잉/팔로워 리스트</b> - 유저가 팔로우하거나 나를 팔로우하는 사람의 목록을 볼 수 있습니다.<br>
      <b>저장된 목록</b> - 내 프로필인 경우 내가 북마크한 게시글 목록을 볼 수 있습니다.
    </td>
  </tr>
</table>

📌  **게시글**

<table>
  <tr>
    <td max-width="500px" >
      <img src="https://velog.velcdn.com/images/jiseung/post/ad493aa1-720d-494b-b427-a025ec5e1517/image.png" />
    </td>
    <td>
      <b>게시글</b> - 게시글을 작성하거나 수정/삭제할 수 있습니다.<br>
      <b>댓글</b> - 게시글에 댓글/대댓글을 작성하거나 수정/삭제할 수 있습니다.<br>
      <b>좋아요</b> - 게시글에 좋아요를 하거나 취소할 수 있습니다.<br>
      <b>좋아요 개수</b> - 특정 게시물에 좋아요한 사람들을 볼 수 있습니다.<br>
      <b>북마크</b> - 특정 게시물을 북마크에 등록하거나 삭제할 수 있습니다.<br>
      <b>공유하기</b> - 특정 게시물을 URL을 통해 공유할 수 있습니다.<br>
    </td>
  </tr>
</table>

🤝 **팔로우**

<table>
  <tr>
    <td max-width="500px" >
      <img src="https://velog.velcdn.com/images/jiseung/post/d9773f7a-4015-4fbb-a55b-e45b5c2bad40/image.png" />
    </td>
    <td>유저를 팔로우하거나 팔로우 취소할 수 있습니다.</td>
  </tr>
</table>

⏰  **알림**

<table>
  <tr>
    <td max-width="500px" >
      <img src="https://velog.velcdn.com/images/jiseung/post/9d48bc9a-1887-4d80-bfa5-26a49a7dc6bd/image.png" />
    </td>
    <td>좋아요/팔로우 요청/댓글/대댓글에 대한 알림을 받을 수 있습니다.</td>
  </tr>
</table>

🔍  **검색**

<table>
  <tr>
    <td max-width="500px">
      <img src="https://velog.velcdn.com/images/jiseung/post/8a1cfb6f-9b26-44d0-af92-4fe97744b176/image.png" />
    </td>
    <td>
      <b>유저 검색</b> - 검색한 이름이나 닉네임과 일치하는 유저를 조회할 수 있습니다.<br>
      <b>해시태그 검색</b> - 검색한 해시태그가 있는 게시물들을 조회할 수 있습니다.
    </td>
  </tr>
</table>

👍  **추천**

<table>
  <tr>
    <td max-width="500px">
      <img src="https://velog.velcdn.com/images/jiseung/post/7e007551-b006-4752-8885-76895bb157b3/image.png" />
    </td>
    <td>
      <b>팔로우 추천</b> - 최근 1시간 이내에 많은 팔로우를 받은 유저들을 보여줍니다.<br>
      <b>피드 추천</b> - 팔로우한 사람이 있다면, 팔로우한 사람의 최신 글을 보여줍니다.
    없다면, 최근 1시간 이내에 많은 좋아요를 받은 글을 보여줍니다.
    </td>
  </tr>
</table>

    
### 🔫 Trouble Shooting

#### 📤 리다이렉션

| 문제 상황 | redirect 관련 코드가 없었는데도 페이지에서 redirect가 실행됨 |
| ------- | --------------------------------------------------------- |
| 원인 | nextConfig의 redirection 설정에서 permanent : true 속성을 주었던 것 |
| 해결 | 속성을 제거한 후에도 캐시되어 있기 때문에 브라우저의 캐시를 삭제 |

| 문제 상황 | 권한이 없는 유저가 페이지에 접근하려고 할 때 느린 redirect  |
| ------- | --------------------------------------------------------- |
| 원인 | 페이지에서 HTTP요청을 하고 나서 redirect |
| 해결 | 권한이 없는 것이 이미 확인된 유저는 server-side에서 redirect |

```tsx
const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const isValidUser = currentUser.isValidUser({ res, req });

  return !isValidUser
    ? {
        redirect: {
          destination: "/",
          permanent: false
        }
      }
    : {
        props: {}
      };
};
```

#### 🚰 SSR

| 문제 상황 | useRouter의 query에서 읽어오는 값이 undefined 인 순간이 존재 |
| ------- | --------------------------------------------------------- |
| 원인 | next는 기본적으로 모든 페이지를 prerender하는데, 페이지가 SSR이 아니면 prerendering시 query의 기본값이 빈 객체({})이다. |
| 해결 | getServerSideProps 의 context를 통해 페이지 렌더링 이전에 query를 읽어 props로 전달 |

| 문제 상황 | 사용자 정보를 server-side 에서 읽고 처리 할 수 없음 |
| ------- | --------------------------------------------------------- |
| 원인 | Web storage를 이용해 값을 보존하고 있기 때문에, client-side 에서만 값을 읽을 수 있음 |
| 해결 | next-cookie 를 이용해 cookie 로 사용자 정보를 관리 |

| 문제 상황 | client-side 에서 새롭게 바뀐 값으로 렌더링 하는 경우 hydration error 발생 |
| ------- | --------------------------------------------------------- |
| 원인 | server-side 와 client-side 에서 초기 렌더링한 html 구조가 맞지 않음 |
| 해결 | client 상태를 나타내는 useClient 와 같은 custom hook 또는 컴포넌트를 dynamic import 를 통해 사용 |

#### 🔑 Query keys

| 문제 상황 | query key 를 제대로 적지 않아 caching 이나 invalidate 가 작동하지 않는 경우가 발생 |
| ------- | --------------------------------------------------------- |
| 원인 | query key 들을 규칙적으로 관리하고 있지 않음 |
| 해결 | [Query-key Factory 방식](https://tanstack.com/query/v4/docs/react/community/lukemorales-query-key-factory)로 key 값을 관리 |

```tsx
// Query Key Factory
const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
}

queryClient.removeQueries({ queryKey: todoKeys.all })

queryClient.invalidateQueries({ queryKey: todoKeys.lists() })

queryClient.prefetchQueries({
  queryKey: todoKeys.detail(id),
  queryFn: () => fetchTodo(id),
})
```

#### 🪵 로그인 유지

| 문제 상황 | HTTP 요청 시 refreshToken이 유효하지만 401 에러를 받는 경우 |
| ------- | --------------------------------------------------------- |
| 원인 | 주기적으로, 혹은 조건 별로 accessToken을 갱신해야 함 |
| 해결 | 응답마다 axios interceptor 정의. 401 에러마다 token 재발급 시도 후 기존 요청 재 시도 |

```null
instance.interceptors.response.use(
    res => {
      return res.data;
    },
    async err => {
      const { config, response } = err;
      if (response?.status !== 401 || config.sent) throw err;

      config.sent = true;
			// 401 에러
      if (response?.status === 401) {
		      try {
					// 재발급 시도
		      await refresh();
					// 기존 요청 재시도
		      return await axios(config);
        } catch (e: any) {
          currentUser.removeNickname();
          throw e;
        }
      }
      throw err;
    }
  );
```

| 문제 상황 | 더 이상 유효하지 않은 사용자 정보가 쿠키에 남아있음 |
| ------- | --------------------------------------------------------- |
| 원인 | 특정 액션(로그아웃)이 없는 한 로컬 쿠키가 삭제되지 않음 |
| 해결 | 사용자 정보 쿠키의 maxAge를 재발급 토큰과 동일한 만료 기간(-1일)으로 설정 |

#### ⚠️ Error handling

| 문제 상황 | 에러 상황별 에러 핸들링이 어려움 |
| ------- | --------------------------------------------------------- |
| 원인 | 상황별 핸들링 방법이 컴포넌트 코드에 흩어져 있음 |
| 해결 | useAPIError 훅에서 API 에러를 핸들링하고, QueryClient의 defaultOptions에서 에러 시 useAPIError에서 정의한 에러 핸들링 함수를 실행하게 함 |

```null
// _app.tsx
const { handleError } = useApiError();

const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            onError: e => {
              handleError(e);
            }
          },
          mutations: {
            onError: e => {
              handleError(e);
            }
          }
        },
        queryCache: new QueryCache({
          onError: (e) => handleError(e)
        })
      })
  );
```

#### 🛰️ API

| 문제 상황 | 서버 응답 값이 모두 data:{필요한 응답 값} 의 형태로 wrapping 되어있음. |
| ------- | --------------------------------------------------------- |
| 원인 | 데이터 응답 형식을 공동으로 사전에 올바르게 정의하지 않음 |
| 해결 | axios 의 transformResponse 속성 사용하여 필요한 응답 값만 추출하고, interface 확장을 통해 타입을 override |

| 문제 상황 | 401 에러 상황 시 refresh 토큰을 이용해 재로그인 하는 로직이 transformResponse 에서 불가함. |
| ------- | --------------------------------------------------------- |
| 원인 | transformResponse 에서는 비동기적인 에러 핸들링이 안됨. |
| 해결 | axios 의 interceptor 를 이용 |

| 문제 상황 | API 가 개발되기 전 API 의 응답 값을 활용한 개발이 불가함. |
| ------- | --------------------------------------------------------- |
| 원인 | Mock API 가 없음. dummy data 이용 시 API 개발 후 호출 로직을 새롭게 작성해야함. |
| 해결 | Next.js 의 /pages/api 루트를 사용해 Mock API 생성, axios instance 분리를 통해 간단하게 prod 버전과 dev 버전을 스위칭 |

```tsx

// 1-1. 타입 확장
interface CustomInstance extends AxiosInstance {
  get<T>(...params: Parameters<AxiosInstance["get"]>): Promise<T>;
  delete<T>(...params: Parameters<AxiosInstance["delete"]>): Promise<T>;
  post<T>(...params: Parameters<AxiosInstance["post"]>): Promise<T>;
  put<T>(...params: Parameters<AxiosInstance["put"]>): Promise<T>;
  patch<T>(...params: Parameters<AxiosInstance["patch"]>): Promise<T>;
}

const axiosInstance = (baseURL: string = ""): **CustomInstance** => {
	// 1-2. response 변형
  const instance = axios.create({..., transformR esponse}); 
	// 2. response status 에 따른 에러 핸들링               
  instance.interceptors.response.use(_, async err => { err.response.status ...});

  return instance;
};

const api = {
  dev: axiosInstance(),
  prod: axiosInstance(API_ENDPOINT)
};

// 3. API 개발 정도에 따른 사용
export const getUserProfile = (...) => api**.prod.**get<ProfileData>(...); // 배포된 API 사용

export const patchUserProfile = (...)=> api.dev.patch<ProfilePatchData>(...); // Mock API 사용
```

## 👋 Team

### 📜 Conventions
[Code](https://www.notion.so/Code-2300a47af82f41d280d5a0b4957962ef)<br>
[Commit Convention](https://www.notion.so/Commit-Convention-48048f6c01ec4fecb08ad09fb4c8274f)<br>
[Issue](https://www.notion.so/Issue-dff43daa80d14af89880593a3eb39851)<br>
[PR](https://www.notion.so/PR-9bfa3b0d54c3410ebdbaa9ef0df292fb)<br>
[Git Branch](https://www.notion.so/Git-Branch-6b8d978afc424d678949954404896de3)

### Members
<table>
  <tr>
  	<td align="center">
      <a href="https://github.com/jiseung-kang">
        <img
          src="https://avatars.githubusercontent.com/jiseung-kang"
          width="100px;"
        /><br />강지승(FE)</a><br />
    </td>
	<td align="center">
      <a href="https://github.com/gwakjaeha"><img
          src="https://avatars.githubusercontent.com/gwakjaeha"
          width="100px;" 
        /><br />곽재하(BE)</a><br />
    </td>
    <td align="center">
      <a href="https://github.com/codeisneverodd">
        <img
          src="https://avatars.githubusercontent.com/codeisneverodd"
          width="100px;"
        /><br />김경현(FE)</a><br />
    </td>
    <td align="center">
      <a href="https://github.com/heyazoo1007">
        <img
          src="https://avatars.githubusercontent.com/heyazoo1007"
          width="100px;"
        /><br />김예진(BE)</a><br />
    </td>
    <td align="center">
      <a href="https://github.com/DongvinPark">
        <img
          src="https://avatars.githubusercontent.com/DongvinPark"
          width="100px;"
        /><br />박동빈(BE)</a><br />
    </td>
  </tr>
</table>
