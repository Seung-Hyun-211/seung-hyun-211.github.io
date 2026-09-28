---
layout: post
title: "Unreal) Spawn"
date: 2026-03-27 23:12:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, SpawnActor]
description: "SpawnActor 사용법과 스폰 위치에 충돌이 있을 때의 처리 옵션을 정리합니다."
original_url: https://beie-myong.tistory.com/15
---

Actor를 생성하려면 World의 `SpawnActor` 함수를 사용한다.

```cpp
GetWorld()->SpawnActor(...);
```

`FActorSpawnParameters`의 Collision Handling Override는 생성 위치에 다른 Actor가 있을 때의 처리 방식을 지정한다.

| 방식 | 설명 |
|---|---|
| `Undefined` | 기본 설정을 사용 |
| `AlwaysSpawn` | 충돌과 관계없이 요청한 위치에 생성 |
| `AdjustIfPossibleButAlwaysSpawn` | 충돌하지 않는 위치를 찾되, 못 찾아도 생성 |
| `AdjustIfPossibleButDontSpawnIfColliding` | 위치를 조정하고, 여전히 충돌하면 생성하지 않음 |
| `DontSpawnIfColliding` | 충돌하면 생성 실패 |

블루프린트에서는 `SpawnActor` 노드에서 클래스와 위치 등의 옵션을 지정한다.

참고: [FActorSpawnParameters](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/FActorSpawnParameters)
