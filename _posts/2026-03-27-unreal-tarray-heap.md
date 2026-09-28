---
layout: post
title: "Unreal) Array - 2"
date: 2026-03-27 23:06:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, TArray, Heap]
description: "TArray의 힙 연산과 Slack, 미초기화 메모리 API를 정리합니다."
original_url: https://beie-myong.tistory.com/5
---

## TArray - Heap

`Heapify()`는 배열을 힙으로 바꾼다. 정렬된 배열을 만들지는 않으며 힙의 부모·자식 관계로 요소를 배치한다.

```cpp
heapArray.Heapify();
heapArray.HeapPush(4);       // 요소 추가
heapArray.HeapPop(topNode);  // 최상위 노드를 반환하며 제거
heapArray.HeapPopDiscard();  // 최상위 노드를 반환하지 않고 제거
heapArray.HeapRemoveAt(1);   // 지정 인덱스 제거
auto top = heapArray.HeapTop();
```

## Slack

```cpp
array.GetSlack(); // 할당됐지만 사용하지 않는 요소 수
array.Num();      // 사용 중인 요소 수
array.Max();      // 할당된 전체 요소 수

array.Reset();    // 요소를 비우고 할당 공간은 유지
array.Shrink();   // 사용하지 않는 끝 공간을 줄임
```

원문 예시에서는 `Empty`, `Reset`, `Add`, `Shrink` 호출에 따라 Slack·Num·Max 값이 어떻게 바뀌는지 설명한다.

## 미초기화 메모리

`AddUninitialized`와 `InsertUninitialized`는 일반적인 Add/Insert와 달리 요소 생성자를 호출하지 않는다. 확보된 공간은 초기화되지 않은 상태이므로 복사나 placement new 등으로 직접 유효한 객체를 만들어야 한다.

```cpp
IntArray.AddUninitialized(4);
FMemory::Memcpy(IntArray.GetData(), dataArray, 4 * sizeof(int32));
```
