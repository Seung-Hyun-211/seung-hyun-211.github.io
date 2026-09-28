---
layout: post
title: "Builder"
date: 2026-04-21 20:59:00 +0900
categories: [디자인패턴]
tags: [Builder, C++, 디자인 패턴]
description: "객체 생성 과정과 표현을 분리하는 Builder 패턴 예제입니다."
original_url: https://beie-myong.tistory.com/30
---

## Builder 패턴

객체의 생성 과정과 표현을 분리해 일관된 생성 절차로 다양한 결과를 만드는 패턴이다. 생성자 인자가 너무 많거나 선택적 매개변수가 많을 때 고려한다.

### 장점과 단점

- 인자의 의미가 명확해져 가독성이 좋아진다.
- 필요한 데이터만 설정할 수 있다.
- Setter 없이 최종 객체를 만들어 불변성을 보장할 수 있다.
- `Build()`에서 유효성 검사를 할 수 있다.
- 모든 정보가 준비된 마지막에 객체를 조립해 복잡한 의존 관계를 순서대로 해결할 수 있다.
- 별도의 Builder 타입으로 복잡도와 오버헤드가 늘어난다.

원문 예제의 주의점은 생성자를 `private`으로 만들어 외부의 직접 생성을 막고, 내부 Builder 클래스를 통해 객체를 만든다는 것이다.

```cpp
class Desktop
{
private:
    std::string cpu;
    std::string ram;
    std::string storage;

    Desktop(std::string c, std::string r, std::string s)
        : cpu(std::move(c)), ram(std::move(r)), storage(std::move(s)) {}

public:
    class Builder
    {
        std::string cpu = "Default CPU";
        std::string ram = "8GB";
        std::string storage = "512GB SSD";

    public:
        Builder& SetCpu(std::string value) { cpu = std::move(value); return *this; }
        Builder& SetRam(std::string value) { ram = std::move(value); return *this; }
        Builder& SetStorage(std::string value) { storage = std::move(value); return *this; }
        std::unique_ptr<Desktop> Build()
        {
            return std::unique_ptr<Desktop>(new Desktop(cpu, ram, storage));
        }
    };
};
```

사용 예:

```cpp
auto pc = Desktop::Builder{}
    .SetCpu("AMD Ryzen7 9800x3D")
    .SetRam("SK hynix DDR5 64GB")
    .SetStorage("2TB M.2")
    .Build();
```
