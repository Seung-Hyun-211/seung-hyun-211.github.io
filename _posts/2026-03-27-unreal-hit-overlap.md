---
layout: post
title: "Unreal) Hit, Overlap"
date: 2026-03-27 23:11:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, Collision, Delegate]
description: "컴포넌트의 Hit 및 Overlap 이벤트를 델리게이트로 받는 방법입니다."
original_url: https://beie-myong.tistory.com/12
---

`BeginPlay`에서 Hit과 Overlap 이벤트를 받을 컴포넌트의 델리게이트에 함수를 연결한다.

```cpp
void AMyActor::BeginPlay()
{
    Super::BeginPlay();
    Box->OnComponentHit.AddDynamic(this, &AMyActor::HitMesh);
    Box->OnComponentBeginOverlap.AddDynamic(this, &AMyActor::OverlapBegin);
    Box->OnComponentEndOverlap.AddDynamic(this, &AMyActor::OverlapEnd);
}
```

각 콜백은 이벤트별 인자를 받아야 한다.

```cpp
UFUNCTION()
void HitMesh(UPrimitiveComponent* HitComponent, AActor* OtherActor,
             UPrimitiveComponent* OtherComp, FVector NormalImpulse,
             const FHitResult& Hit);

UFUNCTION()
void OverlapBegin(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor,
                  UPrimitiveComponent* OtherComp, int32 OtherBodyIndex,
                  bool bFromSweep, const FHitResult& SweepResult);

UFUNCTION()
void OverlapEnd(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor,
                UPrimitiveComponent* OtherComp, int32 OtherBodyIndex);
```
