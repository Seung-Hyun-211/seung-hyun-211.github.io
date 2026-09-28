---
layout: post
title: "ServiceLocator"
date: 2026-04-18 01:52:00 +0900
categories: [디자인패턴]
tags: [Service Locator, C#, 디자인 패턴]
description: "서비스를 타입별로 등록하고 조회하는 Service Locator 예제입니다."
original_url: https://beie-myong.tistory.com/29
---

## 서비스 로케이터

서비스를 타입별로 등록하고 필요할 때 조회하는 정적 로케이터 예시다.

```csharp
static class ServiceLocator
{
    static Dictionary<Type, object> services = new();

    public static void Register<T>(T instance) where T : class, IService
    {
        Type type = typeof(T);
        if (!services.ContainsKey(type))
            services.Add(type, instance);
    }

    public static T Get<T>() where T : class, IService
    {
        if (services.TryGetValue(typeof(T), out object service))
            return (T)service;
        return null;
    }
}
```

## 서비스 인터페이스와 사용

```csharp
public interface IService { }

public interface IChatting : IService
{
    void Send(string message);
}

public class ChatService : IChatting
{
    public void Send(string message)
    {
        Console.WriteLine(message);
    }
}

// Composition Root 등에서 서비스를 등록한 뒤 조회
ChatService chatService = new ChatService();
ServiceLocator.Register<IChatting>(chatService);
IChatting chatting = ServiceLocator.Get<IChatting>();
chatting.Send("Ha!");
```
