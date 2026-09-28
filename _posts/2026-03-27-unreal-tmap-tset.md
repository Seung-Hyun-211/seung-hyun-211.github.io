---
layout: post
title: "Unreal) Map Set"
date: 2026-03-27 23:11:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, TMap, TSet]
description: "TMap과 TSet의 기본 동작, 검색, 제거, 메모리 관련 API를 정리합니다."
original_url: https://beie-myong.tistory.com/13
---

## TMap

`TMap`은 Key-Value 쌍(`TPair`)을 요소로 관리한다. 키는 고유하며 키 비교를 위해 `operator==`가 필요하다. 같은 키에 여러 값을 저장하려면 `TMultiMap`을 사용한다.

```cpp
TMap<int32, FString> NumToString;
NumToString.Add(1, TEXT("one"));
NumToString.Add(2, TEXT("two"));
NumToString.Add(2, TEXT("TWO")); // 기존 키의 값을 대체
```

`Emplace`는 복사·이동 없이 요소를 만들고, `Append`나 `MoveTemp`로 맵을 옮길 수 있다. 반복은 range-for 또는 `CreateIterator` / `CreateConstIterator`로 할 수 있다.

```cpp
for (const auto& Item : NumToString)
{
    // Item.Key, Item.Value 사용
}
```

`Remove`는 키로 요소를 제거한다. `FindAndRemoveChecked`, `RemoveAndCopyValue`는 제거와 동시에 값을 얻을 때 쓸 수 있다. `Find`, `FindOrAdd`, `FindRef`, `Contains`, `Num`, `GenerateKeyArray`, `GenerateValueArray` 등으로 검색·조회한다.

키로 값을 찾는 맵 특성상 값에서 키를 찾는 `FindKey`는 해시를 활용하지 않아 느릴 수 있다. `Reserve`, `Shrink`, `Compact`로 할당 공간을 조정할 수 있고 `KeySort` / `ValueSort`로 정렬할 수 있다.

사용자 키 비교·해시 방식은 `BaseKeyFuncs`를 상속해 `GetSetKey`, `Matches`, `GetKeyHash`를 정의할 수 있다.

## TSet

`TSet`은 데이터 값 자체를 키로 사용해 고유 요소를 관리한다. 요소 평가에 사용하는 함수를 오버라이드할 수 있으며, 그 외 동작은 `TMap`과 비슷하다.
