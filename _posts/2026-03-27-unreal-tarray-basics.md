---
layout: post
title: "Unreal) Array - 1"
date: 2026-03-27 23:06:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, TArray]
description: "TArray의 생성·조회·정렬·검색·제거와 메모리 동작을 정리합니다."
original_url: https://beie-myong.tistory.com/4
---

`TArray`는 요소 타입과 선택적 얼로케이터로 정의하는 기본 컨테이너다.

```cpp
TArray<int32> IntArray;
IntArray.Init(10, 3); // [10, 10, 10]
```

## 추가와 삽입

`Add`는 요소를 복사하거나 이동해 끝에 추가하고, `Emplace`는 전달한 인자로 새 인스턴스를 만든다. `Append`는 여러 요소를 추가하고, `AddUnique`는 중복을 피하며, `Insert`는 지정한 인덱스에 요소를 삽입한다.

```cpp
TArray<FString> Names;
Names.Add(TEXT("Text1"));
Names.Emplace(TEXT("Text2"));
Names.AddUnique(TEXT("Text2"));
Names.Insert(TEXT("Text0"), 0);
Names.SetNum(8);
```

## 정렬

`Sort`는 비교 연산자를 기준으로 정렬한다. 람다를 전달해 길이 같은 사용자 기준으로 정렬할 수 있고, `StableSort`는 같은 기준의 요소 순서를 보존한다.

```cpp
Names.Sort([](const FString& A, const FString& B)
{
    return A.Len() < B.Len();
});

Names.StableSort();
```

## 조회와 검색

- `Num()`은 사용 중인 요소 수, `GetData()`는 요소 배열의 포인터, `GetTypeSize()`는 요소 크기를 반환한다.
- `IsValidIndex()`로 인덱스를 확인할 수 있다.
- `Last()`와 `Top()`으로 끝 요소에 접근하고, `Contains()` 또는 `ContainsByPredicate()`로 포함 여부를 검사한다.
- `Find`, `FindLast`, `FindByPredicate` 등으로 요소를 검색한다. 포인터를 반환하는 검색은 찾지 못하면 `nullptr`을 반환할 수 있다.
- `FilterByPredicate()`는 조건에 맞는 요소를 필터링한다.

## 제거와 배열 메모리

`Remove`는 일치하는 모든 요소, `RemoveSingle`은 첫 일치 요소, `RemoveAt`은 지정 인덱스 요소를 제거한다. `RemoveAll`은 조건에 맞는 요소를 제거하며, Swap 계열은 빠르지만 제거 뒤 요소 순서가 바뀔 수 있다.

`Empty`, `Reset`, `Shrink`, `GetSlack`, `Max` 등을 사용해 배열의 용량과 여유 공간을 다룬다. `AddUninitialized`와 `InsertUninitialized`는 생성자 호출 없이 미초기화 공간을 확보하므로 이후 메모리를 직접 올바르게 초기화해야 한다.

배열 대입은 독립적인 복사본을 만든다. `+=`로 다른 배열을 붙일 수 있고, `MoveTemp`는 기존 배열의 데이터를 이동한다.
