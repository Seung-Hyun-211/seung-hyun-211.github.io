---
layout: post
title: "Unreal) Delegate"
date: 2026-03-27 23:08:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, Delegate]
description: "언리얼 델리게이트 선언, 바인딩, 실행 방법을 요약합니다."
original_url: https://beie-myong.tistory.com/9
---

델리게이트는 임의 객체의 멤버 함수에 동적으로 바인딩할 수 있다. 델리게이트 객체는 복사해도 안전하며, 참조를 전달해 사용한다. Single-cast, Multi-cast, Dynamic 형태가 있다.

## 선언 매크로

| 함수 시그니처 | 매크로 형태 |
|---|---|
| `void Function()` | `DECLARE_DELEGATE(Name)` |
| `void Function(P1)` | `DECLARE_DELEGATE_OneParam(Name, P1Type)` |
| `void Function(P1, P2)` | `DECLARE_DELEGATE_TwoParams(Name, P1Type, P2Type)` |
| 반환값이 있는 함수 | `DECLARE_DELEGATE_...(ReturnType, Name, ...)` |

## 바인딩과 실행

바인딩 함수마다 포인터의 강도와 안전성이 다르므로 대상 객체의 수명과 호출 방식을 고려한다.

| 함수 | 용도 |
|---|---|
| `Bind()` | 기본 델리게이트 객체에 바인딩 |
| `BindStatic()` | 전역 함수 바인딩 |
| `BindRaw()` | raw C++ 포인터에 바인딩. 대상 수명과 `Execute()` 호출에 유의 |
| `BindSP()` | SharedPtr 기반 멤버 함수에 바인딩 |
| `BindUObject()` | UObject 기반 멤버 함수에 바인딩 |
| `UnBind()` | 바인딩 해제 |

```cpp
MyDelegate.BindRaw(&MyFunction, 22, true); // payload 예시

MyDelegate.Execute();       // 바인딩된 함수 실행
MyDelegate.ExecuteIfBound();
MyDelegate.IsBound();       // 바인딩 여부 확인
```
