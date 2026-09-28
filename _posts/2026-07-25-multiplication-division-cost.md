---
layout: post
title: "곱셈과 나눗셈의 비용차이에 관하여"
date: 2026-07-25 15:34:00 +0900
categories: [셰이더]
tags: [GPU, 셰이더, 최적화]
description: "셰이더에서 나눗셈과 역수 곱셈을 비교하고 Remap 연산을 단순화합니다."
original_url: https://beie-myong.tistory.com/34
---

컴퓨터에서 곱셈과 나눗셈의 회로 복잡도는 매우 큰 차이가 난다.

덧셈과 곱셈은 한 번의 사이클에서 처리 가능하지만 나눗셈은 반복 뺄셈을 해야 하기 때문에 회로가 복잡하다. ALU(연산 유닛)에 나눗셈 전용 회로를 넣기에는 너무 큰 공간을 차지하기 때문에 `A / B`를 `A * (1/B)`로 변환하여 곱셈 회로를 사용한다.

## 셰이더의 Divide Node

GPU에서의 셰이더 나눗셈 연산도 마찬가지이다. Divide 노드의 경우 상당한 비용이 들어가기 때문에 나눗셈을 하는 것보다 역수를 미리 구하고 곱해주는 방식으로 처리하는 것이 더 효율적이라고 볼 수 있다.

```text
Divide(2) -> Multiply(0.5)
```

또한 코드에서도 역수를 미리 구하여 반복되는 나눗셈을 처리할 수 있다.

```cpp
// 수정 전
float value1 = A / D;
float value2 = B / D;
float value3 = C / D;

// 수정 후: D의 역수를 한 번 구해 재사용
float reciprocal = rcp(D);
float value1 = A * reciprocal;
float value2 = B * reciprocal;
float value3 = C * reciprocal;
```

## Ramp Shader 속 예시

램프 셰이더는 빛의 각도에 따라 그라데이션을 주는 방법으로 주로 툰 셰이더에서 사용된다. 빛과 법선 벡터의 내적으로 그림자의 위치를 계산하는 과정에서 Remap 노드를 통해 빛과 법선의 범위를 `-1 ~ 1`에서 `0 ~ 1`로 변경해야 한다.

Remap 노드에는 나눗셈 연산이 포함되어 있다. 따라서 원문에서 설명한 것처럼 Remap 노드를 Add 노드와 Multiply 노드로 단순화할 수 있다.

참고: [Unity Shader Graph Divide Node](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.5/manual/Divide-Node.html?q=Divide)
