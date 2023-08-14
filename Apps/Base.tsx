import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  resetCounter,
  removeAllItems,
  deleteItem,
  addNewItem,
} from "./redux/reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export default function Base() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const totalQuantity = useSelector((state: any) => state.cart.totalQuantity);
  const handleAddItem = (itemId: number) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleDeleteItem = (itemId: number) => {
    dispatch(deleteItem(itemId));
  };

  const handleResetCounter = () => {
    dispatch(resetCounter());
  };

  const handleRemoveAllItems = () => {
    dispatch(removeAllItems());
  };
  const handleAddNewItem = () => {
    dispatch(addNewItem());
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <Ionicons name="cart-outline" size={32} />
        <Text style={styles.totalQuantity} testID="total-quantity">
          {totalQuantity}
        </Text>
        <Text>Items</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={handleResetCounter}
          style={{ backgroundColor: "#28A745", padding: 8, borderRadius: 4 }}
          testID="reset-state"
        >
          <Ionicons name="refresh-circle" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRemoveAllItems}
          style={{
            backgroundColor: "#4EA5FB",
            padding: 8,
            borderRadius: 4,
            marginLeft: 8,
          }}
          testID="remove-all-items"
        >
          <FontAwesome5 name="recycle" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAddNewItem}
          style={{
            backgroundColor: "#FFC107",
            padding: 8,
            borderRadius: 4,
            marginLeft: 8,
          }}
          testID="add-new-item"
        >
          <Ionicons name="add-circle-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 16 }}>
        {cartItems.map((item: any) => (
          <View
            key={item.id}
            style={styles.itemsContainer}
            testID="items-container"
          >
            <View
              style={{
                marginTop: 4,
                marginRight: 8,
                backgroundColor: item.quantity === 0 ? "#FFC107" : "#007BFF",
                width: 70,
                height: 45,
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }} testID="item-quantity">
                {item.quantity === 0 ? "Zero" : item.quantity}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 8,
                gap: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => handleAddItem(item.id)}
                style={{
                  backgroundColor: "#6C757D",
                  padding: 8,
                  borderRadius: 4,
                }}
                testID="increase-quantity"
              >
                <Ionicons name="add-outline" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRemoveItem(item.id)}
                style={styles.modifyQuantity}
                testID="decrease-quantity"
              >
                <Ionicons name="remove-outline" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteItem(item.id)}
                style={{
                  backgroundColor: "#DC3545",
                  padding: 8,
                  borderRadius: 4,
                  marginLeft: 8,
                }}
                testID="delete-from-cart"
              >
                <Ionicons name="trash-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#DDF2F5",
    borderRadius: 8,
    gap: 10,
  },
  totalQuantity: {
    backgroundColor: "#17A2B8",
    width: 50,
    textAlign: "center",
    padding: 4,
    borderRadius: 3,
    color: "white",
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  itemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  modifyQuantity: {
    backgroundColor: "#17A2B8",
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});
