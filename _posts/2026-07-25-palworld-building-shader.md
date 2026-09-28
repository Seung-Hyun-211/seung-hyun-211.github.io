---
layout: post
title: "Palworld 건설 셰이더"
date: 2026-07-25 16:43:00 +0900
categories: [셰이더]
tags: [Palworld, 셰이더, 머티리얼]
description: "건설 진행도에 따라 색이 바뀌는 셰이더를 만들어봅니다."
original_url: https://beie-myong.tistory.com/35
---

# Palworld의 건설 셰이더와 비슷하게 만들어보자

먼저 건설 정도에 따라 상하로 나눠 시각적으로 표현해준다는 것을 알 수 있다.

## 1. 반반 나누기

Object Position을 통해 `-1 ~ 1` 값을 불러와 `0 ~ 1`로 Remap 처리해주고, process에 맞추어 두 개의 색상과 alpha 값으로 처리하게 하였다.

## 2. 중간에 노란 선 추가하기

먼저 구한 값과 process가 `0.01` 차이 내인 범위에 Emission을 변경하였다.

## 코드를 통해 process를 변경한 결과

원문에서는 코드를 통해 process를 변경한 결과를 이미지로 보여준다. 이 옮긴 글에는 Tistory에 있던 이미지 대신 진행도 값과 스크린샷을 추가할 수 있도록 공간을 비워둔다.
