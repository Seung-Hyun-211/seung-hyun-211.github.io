---
layout: post
title: "Unreal) Controller"
date: 2026-03-27 23:07:00 +0900
categories: [언리얼]
tags: [Unreal Engine, Controller, Pawn]
description: "Controller의 역할과 PlayerController의 주요 요소, Pawn 빙의 순서를 정리합니다."
original_url: https://beie-myong.tistory.com/8
---

## Controller

Controller는 Pawn을 조종하기 위한 클래스다. 플레이어가 입장할 때 배정되며 바꿀 수 없다. 입력으로 Pawn을 조종하는 `PlayerController`, AI 로직으로 조종하는 `AIController` 등이 있다.

`PlayerController`는 Player, HUD, Camera를 다루며 Pawn 조작뿐 아니라 UI와 카메라 제어에도 관여한다.

```cpp
UPROPERTY()
TObjectPtr<UPlayer> Player;

UPROPERTY()
TObjectPtr<AHUD> MyHUD;

UPROPERTY(BlueprintReadOnly, Category = PlayerController)
TObjectPtr<APlayerCameraManager> PlayerCameraManager;
```

## 게임 실행과 Pawn 빙의 순서

1. Controller 생성
2. Pawn 생성
3. PlayerController가 Pawn에 빙의
4. 게임 시작

원문 노트에서는 GameMode의 `PostLogin`에서 Pawn 생성과 빙의가 진행된다고 설명하며, `PostInitializeComponents`와 `OnPossess`에 로그를 두어 실행 순서를 확인한다.

```cpp
// GameMode
AMyGameModeBase::PostLogin(APlayerController* NewPlayer)

// PlayerController
AMyPlayerController::PostInitializeComponents()
AMyPlayerController::OnPossess(APawn* Pawn)

// Pawn
AMyPlayer::PostInitializeComponents()
```
