---
layout: post
title: "Unreal) String"
date: 2026-03-27 23:12:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, FString, FName, FText]
description: "언리얼 문자열 타입 FName, FText, FString과 주요 변환을 정리합니다."
original_url: https://beie-myong.tistory.com/16
---

문자열 리터럴 인코딩에는 `TEXT()` 매크로를 사용한다.

| 타입 | 특징 |
|---|---|
| `FName` | 이름 테이블에 한 번 저장, 대소문자를 구분하지 않으며 변경 불가 |
| `FText` | 현지화를 위한 텍스트 타입. 사용자에게 보이는 UI 문자열에 적합 |
| `FString` | 검색·변경·비교가 가능한 조작용 문자열 타입. 기능이 많은 만큼 상대적으로 무겁다 |

## FName 변환 예시

```cpp
FName TestName(TEXT("TestFName"));
FString TestString = TestName.ToString();
FText TestText = FText::FromName(TestName);
FName NameFromString(*TestString);
```

`FName`은 `==`로 비교하거나 `Compare()`를 사용해 -1, 0, 1 결과를 받을 수 있다.

## FText

`FText`는 텍스트 포맷, 숫자·시간 표시, 현지화에 유용하다. 빈 텍스트는 `FText::GetEmpty()` 또는 기본 생성으로 만들 수 있다.

- `AsCultureInvariant`: 현지화되지 않는 FText 생성
- `FromString`: FString에서 FText 생성
- `FromName`: FName에서 FText 생성
- `EqualTo`, `CompareTo`: 비교

참고: [Unreal Engine String Handling](https://dev.epicgames.com/documentation/en-us/unreal-engine/string-handling-in-unreal-engine#conversions)
