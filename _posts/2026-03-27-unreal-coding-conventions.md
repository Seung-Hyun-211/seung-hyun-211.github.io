---
layout: post
title: "Unreal) 코딩 규율"
date: 2026-03-27 23:07:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, 코딩 규칙]
description: "언리얼 C++의 선언 순서, 명명 접두사, const와 auto 사용 노트입니다."
original_url: https://beie-myong.tistory.com/6
---

## Class

클래스는 읽는 사람을 고려해 작성하고, 원문 노트에서는 `public` 선언을 먼저 두는 규칙을 기록했다.

## 명명 규칙

각 단어의 첫 글자를 대문자로 쓰고 타입에 맞는 접두사를 사용한다.

| 접두사 | 의미 |
|---|---|
| `T` | 템플릿 클래스 |
| `U` | `UObject` 상속 클래스 |
| `A` | `AActor` 상속 클래스 |
| `S` | `SWidget` 상속 클래스 |
| `I` | 인터페이스 |
| `C` | Concept |
| `E` | Enum |
| `b` | bool |
| `F` | 그 외 대부분의 실용적 non-UObject 타입 |

## const

함수가 입력 인자를 수정하지 않는다면 `const` 참조나 포인터로 전달한다. 객체 상태를 바꾸지 않는 멤버 함수에는 `const`를 붙이고, 컨테이너를 수정하지 않는 반복문도 `const` 참조를 사용한다.

```cpp
void SomeMutatingOperation(FThing& OutResult,
                           const TArray<int32>& InArray);

void FThing::SomeNonMutatingOperation() const;

for (const FString& Name : StringArray)
{
    // 읽기 전용
}
```

## nullptr와 auto

- `NULL` 대신 `nullptr`를 사용한다.
- 초기화 대상의 타입이 명확히 드러나도록 대부분의 상황에서는 `auto`를 피한다.
- 람다를 변수에 저장하거나, 반복자 타입을 다루거나, 템플릿에서 타입이 쉽게 드러나지 않는 경우에는 `auto`를 사용할 수 있다.
