# 이승현의 기록 — 블로그 설계와 구현

이 저장소는 `seung-hyun-211.github.io` 사용자 사이트의 소스다. GitHub Pages의 Jekyll 빌드가 `_posts`의 Markdown 글을 HTML 페이지로 만들고, 홈 목록도 같은 글 모음에서 생성한다. 별도 데이터베이스나 글 목록을 수동으로 관리하는 JavaScript 배열은 없다.

이 문서는 운영 및 구조 설명용이다. `_config.yml`의 `exclude`에 `README.md`가 들어 있으므로 Jekyll 출력물과 블로그 글 목록에 포함되지 않는다.

## 파일 구성

```text
_config.yml             Jekyll 설정, 글 URL 및 제외 파일
_posts/*.md             개별 글의 메타데이터와 본문
_layouts/default.html   공통 HTML 문서, 왼쪽 프로필·분류·프로젝트 링크
_layouts/post.html      개별 글 제목·날짜·본문·원문·이전/다음 글
index.html              홈, 검색·분류 필터, 전체 글 카드
assets/css/style.css    어두운 테마와 반응형 레이아웃
assets/js/blog.js       이미 생성된 글 카드의 브라우저 내 검색·필터
README.md               이 문서: 빌드에서 제외
```

`_posts`에는 티스토리에서 옮긴 Markdown 글 41개가 있다. 글 수는 파일 추가·삭제에 따라 달라진다. 티스토리 글에는 가능한 경우 `original_url`을 넣어 원문으로 이동할 수 있게 했다. 외부 삽입 영상만 있는 글은 확인 가능한 설명과 원문 링크를 담았다.

## 페이지가 만들어지는 흐름

1. 글 파일의 YAML front matter에서 제목, 작성일, 분류, 태그 등을 읽는다.
2. Jekyll이 Markdown 본문을 HTML로 변환한다. 각 글은 `_layouts/post.html`을 거쳐 `_layouts/default.html` 안에 표시된다.
3. `index.html`은 `site.posts`를 날짜로 정렬한 뒤 글 카드와 개수를 생성한다. 기본 순서는 최신순이고 카드 링크는 각 글의 `post.url`이다.
4. 공통 레이아웃은 `site.categories`에서 왼쪽 분류 메뉴를 만든다. 분류 링크는 홈의 `?category=분류명`으로 연결된다. 프로젝트 링크 4개는 GitHub 프로필 README의 대표 프로젝트를 기준으로 작성한 고정 링크다.
5. `assets/js/blog.js`는 렌더링된 카드의 `data-search`, `data-categories` 값을 이용해 검색어와 분류에 맞는 카드를 보여준다. `data-timestamp`로 최신순·오래된순을 바꿀 수도 있다. 글 데이터를 별도로 요청하지 않으며, JavaScript가 꺼져도 최신순 목록과 본문 링크는 남는다.

글 카드의 검색 대상에는 제목과 본문 텍스트가 들어간다. 이 때문에 글이 아주 많아지면 홈 HTML이 커질 수 있다. 현재 규모에서는 단순한 정적 사이트 구조로 운영한다.

## 글 작성 형식

파일 이름은 `_posts/YYYY-MM-DD-영문-슬러그.md` 형식을 따른다. 예:

```markdown
---
layout: post
title: "새 글 제목"
date: 2026-09-29 21:00:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++]
description: "선택 사항: 검색 결과와 페이지 설명에 쓸 한 줄 요약"
original_url: https://beie-myong.tistory.com/42
---

## 첫 번째 소제목

본문을 Markdown으로 작성한다.
```

`original_url`은 티스토리에서 옮긴 글에만 사용한다. 새 글이라면 생략한다. `layout: post`는 현재 Jekyll 기본값으로도 지정되어 있지만, 기존 글처럼 파일에 명시해도 된다. 작성일은 시간대까지 넣어 글 정렬이 명확하도록 한다.

새 글을 `_posts`에 넣고 GitHub Pages가 사용하는 브랜치로 푸시하면, 빌드 후 홈·분류 메뉴·개별 글에 반영된다. 글을 홈 HTML에 추가로 등록할 필요는 없다.

## URL과 화면

- `_config.yml`의 `permalink: /:year/:month/:day/:title/`에 따라 글 URL이 만들어진다. `:title`은 파일명 뒤의 슬러그를 기준으로 한다.
- `url`은 `https://seung-hyun-211.github.io`, `baseurl`은 빈 문자열이다. 사용자 사이트의 루트 경로에서 운영한다.
- 시간대는 `Asia/Seoul`, Markdown 변환기는 `kramdown`이다.
- 화면은 어두운 배경의 왼쪽 탐색 메뉴와 오른쪽 글 영역으로 구성된다. 홈은 짧은 소개, 검색·분류·날짜 정렬, 간결한 글 목록 순서다. 좁은 화면에서는 한 열로 바뀐다.
- 프로필 이미지는 GitHub 사용자 아바타 URL에서 불러온다. 해당 외부 URL에 접근할 수 없으면 이미지만 표시되지 않는다.
- 왼쪽 프로젝트 링크는 [GitHub 프로필 README](https://github.com/Seung-Hyun-211/Seung-Hyun-211)의 대표 프로젝트 목록을 기준으로 한다. 프로필 README가 바뀌어도 블로그 링크는 자동 갱신되지 않으므로 `_layouts/default.html`에서 함께 수정한다.

## 날짜 정렬

`index.html`의 `site.posts | sort: 'date' | reverse`가 빌드 시 최신순을 만든다. 게시물의 `date` 필드는 가능하면 시간대까지 기록한다. 각 글 카드의 `data-timestamp`는 같은 날짜의 글까지 정확히 비교하기 위한 값이다.

방문자가 정렬 메뉴에서 `오래된순`을 고르면 `blog.js`가 이미 만들어진 카드의 순서를 바꾼다. 검색과 분류 필터를 적용한 상태에서도 같은 정렬을 유지한다. 날짜가 같은 글은 빌드된 원래 순서를 유지한다. `?sort=oldest` 주소로 들어와도 오래된순을 선택한다.

## 배포와 확인

GitHub Pages가 이 저장소의 Jekyll 소스를 빌드해야 한다. 변경 내용을 커밋한 뒤 Pages가 사용하는 브랜치에 푸시하고, 배포가 끝나면 홈에서 새 글 제목과 개수를 확인한다. 글 카드, 분류 선택, 검색, 개별 글 링크, 원문 링크 순서로 확인하면 된다.

화면에 글이 없을 때는 먼저 배포된 `index.html`이 이 저장소의 최신 버전인지 확인한다. 이전 구현에는 JavaScript 안에 글 목록 8개를 직접 적었고 문자열의 줄바꿈 때문에 스크립트가 실행되지 않는 문제가 있었다. 현재 구현은 Jekyll의 `site.posts`에서 목록을 생성하므로, 새 글이 보이지 않으면 푸시 여부와 Pages 빌드 결과, 게시물 front matter 및 파일명을 확인한다.
