---
layout: post
title: "좋은 코드 나쁜 코드 (3)"
date: 2026-04-18 01:06:00 +0900
categories: [책]
tags: [좋은 코드 나쁜 코드, 예측 가능성, 오류 처리]
description: "매직값, Null 객체, 부수 효과와 예측 가능한 API에 관한 독서 노트입니다."
original_url: https://beie-myong.tistory.com/28
---

## 예측 가능한 코드

### 매직값은 버그를 유발한다

`return -1;`처럼 의미가 불분명한 하드코딩 값은 호출하는 쪽에서 오해하기 쉽다. 상황에 따라 `null`, Optional, 예외를 반환하거나 이름 있는 상수로 의미를 드러낸다.

### Null 객체 패턴

Null 대신 아무 일도 하지 않는 객체를 만들면 매번 null 검사를 하지 않아도 된다.

```cpp
// Null 객체가 적합한 경우
weapon.Attack();
```

다만 Null 객체가 돌려주는 기본값을 호출자가 실제 값으로 오해할 수 있다면 쓰지 않는 편이 낫다. 빈 문자열도 단순 텍스트로는 괜찮지만 ID처럼 의미가 있는 값으로 쓰이면 문제가 될 수 있다.

## 부수 효과와 매개변수

UI 출력, DB 저장, 네트워크 요청, 캐시 갱신은 부수 효과다. 불필요한 부수 효과를 피하고, 필요한 효과는 호출자에게 분명하게 드러낸다. 입력 매개변수는 직접 수정하기보다 복사해 사용한다.

함수 이름으로 결과를 예측할 수 있게 하고, 중요한 입력을 필수 항목으로 둔다. 열거형 switch에서 알 수 없는 상태는 명시적으로 오류 처리해 미래의 새 값을 놓치지 않도록 한다.

```cpp
switch (state)
{
case State::Idle:
    break;
case State::Dead:
    break;
default:
    throw std::out_of_range("Unknown state value");
}
```
