import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {Button, Icon, Image, Input, Text} from '@rneui/themed';
import {StackNavigationProp} from '@react-navigation/stack';
import {Controller, useForm} from 'react-hook-form';
import {Stack, Inline} from '@mobily/stacks';
import {useTranslation} from 'react-i18next';
import {ROUTES} from '../../enums/RouteEnum';
import {AuthStackParamList} from '../../compoments/Nagivation/TypeNavigation';
// import SocialSignIn from '../../compoments/SocialSignIn';
import variables from '../../assets/styles/variables';
import styles from '../../assets/styles';
import API from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormValues = {
  username: string;
  email: string;
  password: string;
  role: string;
};

type RegisterScreen = StackNavigationProp<AuthStackParamList, ROUTES.REGISTER>;

const RegisterScreen: React.FC<{navigation: RegisterScreen}> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      username: undefined,
      email: undefined,
      password: undefined,
      role: undefined,
    },
  });

  const onSubmit = (formData: FormValues) => {
    setIsLoading(true);
    API.Register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: ["user"],
    }).then(res => res.json())
    .then(async res =>{
      setIsLoading(false);
      if(res.accessToken){
        navigation.navigate('MoreInfoScreen');
        AsyncStorage.setItem('token', res.accessToken)
      }else{
        Alert.alert(res.message)
      }
    }).catch(e => console.log(e));
  };

  return (
    <ScrollView style={componentStyles.container}>
      <Stack space={8} paddingX={4}>

        <Stack space={2}>
          <Image source={require('./../../assets/images/logo.png')} style={{width: 200, height:100}}/>
        </Stack>

        <Stack space={2}>
          <Text h3 style={componentStyles.title}>
            {t('register.title')}
          </Text>
          <Text style={componentStyles.subtitle}>{t('register.subtitle')}</Text>
        </Stack>

        <Stack space={4}>
          <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: t('error.required.message'),
                },
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  label={<Text>{t('form.username.label')}</Text>}
                  placeholder={t('form.username.placeholder')}
                  leftIcon={<Icon name="user" type="feather" size={20} />}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.username && errors.username.message}
                  renderErrorMessage={!!errors.username}
                />
              )}
              name="username"
            />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: t('error.required.message'),
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('error.invalid_email.message'),
              },
            }}
            render={({field: {onChange, value}}) => (
              <Input
                label={<Text>{t('form.email.label')}</Text>}
                placeholder={t('form.email.placeholder')}
                leftIcon={<Icon name="mail" type="feather" size={20} />}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email && errors.email.message}
                renderErrorMessage={!!errors.email}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: t('error.required.message'),
              },
            }}
            render={({field: {onChange, value}}) => (
              <Input
                label={<Text>{t('form.password.label')}</Text>}
                placeholder={t('form.password.placeholder')}
                leftIcon={<Icon name="key-outline" type="ionicon" size={20} />}
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password && errors.password.message}
                renderErrorMessage={!!errors.password}
              />
            )}
            name="password"
          />

          {error !== '' && <Text style={styles.textError}>{error}</Text>}
        </Stack>

        <Button
          title={t('common.register')}
          size="lg"
          loading={isLoading}
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
        />

        <Inline space={2} alignX="center">
          <Text>{t('register.have_account')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            <Text style={[styles.fontWeightBold, styles.textPrimary]}>
              {t('common.login')}
            </Text>
          </TouchableOpacity>
        </Inline>

        {/* <SocialSignIn /> */}
      </Stack>
    </ScrollView>
  );
};

const componentStyles = StyleSheet.create({
  container: {
    backgroundColor: variables.white,
    flex: 1,
  },
  title: {
    color: variables.black,
  },
  subtitle: {
    color: variables.grey3,
    fontSize: 16,
  },
});

export default RegisterScreen;
