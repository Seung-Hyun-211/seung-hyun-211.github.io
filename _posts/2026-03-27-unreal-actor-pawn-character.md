---
layout: post
title: "Unreal) Actor Pawn Character"
date: 2026-03-27 23:05:00 +0900
categories: [언리얼]
tags: [Unreal Engine, Actor, Pawn, Character]
description: "언리얼의 Actor, Pawn, Character 차이와 기본 Pawn 설정을 정리합니다."
original_url: https://beie-myong.tistory.com/3
---

## Actor / Pawn / Character

| 클래스 | 설명 |
|---|---|
| Actor | 레벨(월드)에 배치되거나 스폰될 수 있는 기본 오브젝트. ActorComponent 컬렉션을 통해 움직임과 렌더링 등을 제어할 수 있다. |
| Pawn | AI나 플레이어가 Controller를 통해 조종하는 오브젝트. |
| Character | 사람형 캐릭터 구현을 위한 Pawn. 기본 충돌체, 메시, 이동 기능을 포함해 점프·이동·중력·충돌 등을 별도로 구현하지 않아도 된다. |

## GameMode에서 Blueprint Pawn 생성하기

원하는 경로의 Pawn 클래스를 찾아 `DefaultPawnClass`로 설정하고, 찾지 못하면 C++ 기본 클래스를 사용한다.

```cpp
static ConstructorHelpers::FClassFinder<APawn> PlayerPawnBPClass(
    TEXT("/Game/BP_MyPlayer"));

if (PlayerPawnBPClass.Class != nullptr)
{
    DefaultPawnClass = PlayerPawnBPClass.Class;
}
else
{
    DefaultPawnClass = AMyPlayer::StaticClass();
}
```
