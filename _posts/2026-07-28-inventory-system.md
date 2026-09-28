---
layout: post
title: "인벤토리 시스템 — 컴포넌트와 서브시스템"
date: 2026-07-28 00:00:00 +0900
categories: [언리얼]
tags: [Unreal Engine, C++, 인벤토리, UGameInstanceSubsystem]
original_url: https://beie-myong.tistory.com/36
---

원문은 아이템 정보를 보관하고 UI에서 슬롯을 드래그해 위치를 바꾸는 인벤토리 제작 메모다. 핵심 구조는 액터 컴포넌트가 슬롯 데이터를 소유하고, 게임 인스턴스 서브시스템이 아이템 데이터와 갱신 이벤트를 관리하는 방식이다.

## 인벤토리 컴포넌트

컴포넌트는 `IInteractable`을 구현하고, 슬롯 조회와 교환 기능을 제공한다. 원문 헤더의 중심부를 정리하면 다음과 같다.

```cpp
UCLASS(ClassGroup=(Custom), meta=(BlueprintSpawnableComponent))
class INVEN_CPP_API UInventoryComponent
    : public UActorComponent, public IInteractable
{
    GENERATED_BODY()

public:
    virtual void Interact(AActor* Interactor) override;

    UPROPERTY(BlueprintReadOnly, Category="Inventory")
    EInteractType Type;

    UFUNCTION(BlueprintPure, Category="Inventory")
    const TArray<FItemSlotData>& GetItemSlots() const { return ItemSlots; }

    UFUNCTION(BlueprintCallable, Category="Inventory")
    void Swap(int32 First, int32 Second);

    void AddItem(FName ItemId, uint32 Count);

private:
    TArray<FItemSlotData> ItemSlots;
    TWeakObjectPtr<UInventorySubsystem> InventorySubsystem;
};
```

슬롯 배열은 컴포넌트가 관리하고, 외부에는 읽기 전용 참조로 노출한다. 슬롯 교환과 아이템 추가는 별도 함수로 제공한다.

## 인벤토리 서브시스템

`UGameInstanceSubsystem` 기반 관리자는 아이템 데이터 테이블, 플레이어 인벤토리 등록, 변경 알림을 맡는다. 원문에는 인벤토리 변경 및 슬롯 교환용 동적 멀티캐스트 델리게이트도 정의되어 있다.

```cpp
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(
    FOnInventoryUpdated, UInventoryComponent*, Inventory);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(
    FOnSlotSwap, int32, First, int32, Second);

UCLASS()
class INVEN_CPP_API UInventorySubsystem : public UGameInstanceSubsystem
{
    GENERATED_BODY()

public:
    UPROPERTY(BlueprintAssignable, Category="Inventory|Event")
    FOnInventoryUpdated OnInventoryUpdated;

    UPROPERTY(BlueprintAssignable, Category="Inventory|Event")
    FOnSlotSwap OnInventorySwap;

    void RegistPlayerInventory(UInventoryComponent* Inventory);
    void NotifyInventoryChanged(UInventoryComponent* Inventory);

    UFUNCTION(BlueprintCallable)
    const FItemDataRow& GetItemData(FName ItemID) const;

private:
    UPROPERTY() UDataTable* ItemDataTable;
    UPROPERTY() UInventoryComponent* PlayerInventory;
};
```

UI는 변경 이벤트를 구독해 표시를 갱신하고, 드래그 앤 드롭 결과를 컴포넌트의 `Swap`으로 전달하는 구조로 확장할 수 있다. 원문 게시물은 이 설계와 헤더 선언을 중심으로 작성되어 있어, 실제 프로젝트에서 필요한 초기화·유효성 검사·슬롯 교환 구현은 별도로 채워야 한다.

---

원문: [인벤토리](https://beie-myong.tistory.com/36)
