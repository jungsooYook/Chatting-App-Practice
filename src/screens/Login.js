import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image, Input, Button } from "../components";
import { images } from "../utils/images";
import { validateEmail, removeWhitespace } from "../utils/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 30px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const passwordRef = useRef();
  const [hidePassword, setHidePassword] = useState(true);
  const insets = useSafeAreaInsets(); /// SafeArea for IOS notch design

  function _setHidePassword() {
    const showPassword = !hidePassword;
    setHidePassword(showPassword);
  }

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  function _handleLoginButtonPress() {}

  function _handleEmailChange(email) {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? "" : "Please verify your email."
    );
  }

  function _handlePasswordChange(password) {
    setPassword(removeWhitespace(password));
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container insets={insets}>
        <Image url={images.logo} imageStyle={{ borderRadius: 8 }} />
        <Input
          label="Email"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
          autoCompleteType="email"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="Password"
          isPassword={hidePassword}
          returnKeyType="done"
          autoCompleteType="password"
        />
        <TouchableOpacity
          onPress={_setHidePassword}
          style={{
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 10,
            paddingBottom: 10,
            margin: 0,
          }}
        >
          <Text>{hidePassword ? "비밀번호 보이기" : "비밀번호 가리기"}</Text>
        </TouchableOpacity>
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="로그인"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="회원가입"
          onPress={() => navigation.navigate("Signup")}
          isFilled={false}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
}

export default Login;
