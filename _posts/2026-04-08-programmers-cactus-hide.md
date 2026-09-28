---
layout: post
title: "프머스 선인장 숨기기"
date: 2026-04-08 20:46:00 +0900
categories: [알고리즘]
tags: [Programmers, 알고리즘, Sliding Window, C++]
description: "격자 내 직사각형의 최소값을 최대로 만드는 문제를 슬라이딩 윈도우로 풉니다."
original_url: https://beie-myong.tistory.com/25
---

문제: [선인장 숨기기](https://school.programmers.co.kr/learn/courses/30/lessons/468379)

가장 최근에 나온 Lv.2 문제를 풀어보았다. `N = 500,000`.

## 접근 아이디어

1. `O(N^3)`: 비가 떨어진 칸을 기록한 뒤 역순으로 되돌리며 주변을 검사한다.
2. `O(N^2)`: 비가 떨어진 순서를 기록하고 `h * w` 범위의 최솟값을 확인한다.
3. `O(N)`: 2번의 최솟값 계산에 슬라이딩 윈도우를 적용한다.

목표는 `m * n` 좌표 범위에서 `h * w` 직사각형을 골라, 그 안의 값 중 최솟값이 최대가 되는 위치를 찾는 것이다.

## 단조 덱 슬라이딩 윈도우

단순히 앞뒤 인덱스를 이용하면 `O(N * m)`이 걸릴 수 있다. 덱에 인덱스를 저장하고 현재 윈도우 밖의 인덱스와 최솟값 후보가 아닌 값을 제거하면 한 줄의 윈도우 최소값을 `O(N)`에 구할 수 있다.

```cpp
std::vector<int> MinSlidingWindow(const std::vector<int>& data, int width)
{
    std::vector<int> result;
    std::deque<int> indices;

    for (int i = 0; i < static_cast<int>(data.size()); ++i)
    {
        while (!indices.empty() && indices.front() <= i - width)
            indices.pop_front();

        while (!indices.empty() && data[indices.back()] >= data[i])
            indices.pop_back();

        indices.push_back(i);

        if (i >= width - 1)
            result.push_back(data[indices.front()]);
    }
    return result;
}
```

2차원 직사각형의 최솟값은 먼저 각 행에 가로 슬라이딩 윈도우를 적용하고, 그 결과에 세로 슬라이딩 윈도우를 적용해 구한다.

## 다른 접근

원문에는 비가 각 위치에 영향을 준 횟수를 기록하고 되돌리는 방법, 각 칸에 낙하 인덱스를 기록한 뒤 직사각형 최솟값을 비교하는 방법도 함께 기록되어 있다.
