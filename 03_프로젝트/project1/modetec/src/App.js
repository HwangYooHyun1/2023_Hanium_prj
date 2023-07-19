import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';  // 라이브러리 불러오기

// 함수 선언 (1)

export default function App() {

  // 함수 선언 (2)

  return (  // 페이지 출력 부분
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
      <Text
          style={{ fontSize: 26, fontWeight: 'bold' }} >
              Hello World!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({  // 스타일 적용 부분

});
