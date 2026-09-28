---
layout: post
title: "Unreal) Property"
date: 2026-03-27 23:11:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, UPROPERTY]
description: "자주 사용하는 UPROPERTY 지정자의 에디터·블루프린트 접근 범위를 정리합니다."
original_url: https://beie-myong.tistory.com/14
---

프로퍼티 선언은 `UPROPERTY` 매크로로 지정자를 붙여 작성한다.

```cpp
UPROPERTY(A, B, ... , key = value)
Type Var;
```

| 지정자 | 의미 |
|---|---|
| `EditAnywhere` | 에디터 패널에서 편집 가능 |
| `BlueprintReadWrite` | 블루프린트에서 읽기·쓰기 가능 |
| `VisibleAnywhere` | 에디터에서 보이지만 편집 불가 |
| `BlueprintReadOnly` | 블루프린트에서 읽기 가능 |
| `EditDefaultsOnly` | 클래스 기본값에서만 편집 가능 |
| `Category = "Category"` | 디테일 패널에서 그룹화 |

참고: [Unreal Engine Property Specifiers](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-uproperties#propertyspecifiers)
