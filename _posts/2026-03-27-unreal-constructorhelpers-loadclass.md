---
layout: post
title: "Unreal) Constructor"
date: 2026-03-27 23:07:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, 리소스 로딩]
description: "ConstructorHelpers와 LoadClass의 용도 및 사용 예시입니다."
original_url: https://beie-myong.tistory.com/7
---

## ConstructorHelpers / LoadClass

`ConstructorHelpers`는 주로 객체 생성자에서 에셋을 찾을 때 사용한다. 경로가 잘못되면 오류가 발생할 수 있으며 `FClassFinder`, `FObjectFinder` 등을 사용한다.

```cpp
static ConstructorHelpers::FObjectFinder<UObject> OutObject(
    TEXT("경로"));

if (OutObject.Succeeded())
{
    // 에셋을 찾았을 때 사용
}
```

`LoadClass`는 클래스가 필요한 시점에 로드하는 함수이며, 로드에 실패하면 `nullptr`을 반환한다.

```cpp
void AMyPlayerController::BeginPlay()
{
    UClass* WidgetClass = LoadClass<UUserWidget>(
        nullptr, TEXT("/Game/Level/TestWidget"));

    if (WidgetClass)
    {
        if (UUserWidget* Widget = CreateWidget<UUserWidget>(this, WidgetClass))
        {
            Widget->AddToViewport();
        }
    }
}
```
