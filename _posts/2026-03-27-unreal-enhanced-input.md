---
layout: post
title: "Unreal) Input System"
date: 2026-03-27 23:08:00 +0900
categories: [언리얼]
tags: [Unreal Engine, Enhanced Input, C++]
description: "Enhanced Input의 핵심 구성과 C++ 바인딩 순서를 정리합니다."
original_url: https://beie-myong.tistory.com/10
---

## Enhanced Input System

주요 구성 요소는 Player Controller, Input Action, Input Mapping Context(IMC)다.

### C++ 설정 흐름

1. 생성자에서 경로를 통해 IMC와 IA 에셋을 불러온다.
2. `BeginPlay`에서 Controller의 Enhanced Input Subsystem에 IMC를 추가한다.
3. `SetupPlayerInputComponent`를 오버라이드해 Input Action과 이벤트 함수를 바인딩한다.

```cpp
// 생성자에서 매핑 컨텍스트 로드
static ConstructorHelpers::FObjectFinder<UInputMappingContext> MappingContext(
    TEXT("/Game/Input/IMC_MyMappingContext"));

if (MappingContext.Succeeded())
{
    DefaultIMC = MappingContext.Object;
}

// BeginPlay에서 매핑 컨텍스트 적용
if (APlayerController* PlayerController = Cast<APlayerController>(GetController()))
{
    if (UEnhancedInputLocalPlayerSubsystem* Subsystem =
        ULocalPlayer::GetSubsystem<UEnhancedInputLocalPlayerSubsystem>(
            PlayerController->GetLocalPlayer()))
    {
        Subsystem->AddMappingContext(DefaultIMC, 0); // 우선순위
    }
}

// SetupPlayerInputComponent에서 바인딩
if (UEnhancedInputComponent* EnhancedInput =
    Cast<UEnhancedInputComponent>(PlayerInputComponent))
{
    EnhancedInput->BindAction(
        MoveAction, ETriggerEvent::Triggered, this, &AMyPlayer::SetDirection);
}
```

## 이동 예시

방향 단위 벡터에 속도와 프레임 시간을 곱해 현재 위치에 더한다.

```cpp
void AMyPawn::Move()
{
    const FVector NewLocation = direction * moveSpeed * deltaTime + GetActorLocation();
    SetActorLocation(NewLocation);
}
```
