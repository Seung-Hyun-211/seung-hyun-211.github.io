---
layout: post
title: "Unreal) Struct"
date: 2026-03-27 23:12:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, USTRUCT, DataTable]
description: "DataTable 행으로 사용할 수 있는 USTRUCT 예제입니다."
original_url: https://beie-myong.tistory.com/17
---

`FTableRowBase`를 상속하면 구조체를 DataTable 행으로 사용할 수 있다.

```cpp
USTRUCT(BlueprintType)
struct FItem : public FTableRowBase
{
    GENERATED_USTRUCT_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    EItemType Type;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 ImageNumber;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString ItemName;
};
```
