---
layout: post
title: "Unreal) Enum"
date: 2026-03-27 23:10:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, Enum]
description: "Blueprint에서 사용할 수 있도록 지정한 언리얼 열거형 예제입니다."
original_url: https://beie-myong.tistory.com/11
---

```cpp
UENUM(BlueprintType)
enum class EItemType : int8
{
    None    UMETA(DisplayName = "None"),
    Consume UMETA(DisplayName = "Consume"),
    Armor   UMETA(DisplayName = "Armor"),
    Weapon  UMETA(DisplayName = "Weapon")
};
```
