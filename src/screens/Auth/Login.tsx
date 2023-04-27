import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button, Icon, Input, Text} from '@rneui/themed';
import {StackNavigationProp} from '@react-navigation/stack';
import {Controller, useForm} from 'react-hook-form';
import {Stack, Inline} from '@mobily/stacks';
import {useTranslation} from 'react-i18next';
import {ROUTES} from '../../enums/RouteEnum';
import {AuthStackParamList} from '../../compoments/Nagivation/TypeNavigation';
import variables from '../../assets/styles/variables';
import styles from '../../assets/styles';
import { login } from '../../api/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormValues = {
  username: string;
  password: string;
};

type token = {
  tokenize : string;
}
type json = {
  json: () => token
}

type LoginScreen = StackNavigationProp<AuthStackParamList, ROUTES.LOGIN>;

const LoginScreen: React.FC<{navigation: LoginScreen}> = ({navigation}) => {
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
      password: undefined,
    },
  });

  const onSubmit = (formData: FormValues) => {
    setIsLoading(true);

    login({
      username: formData.username,
      password: formData.password,
    }).then((res : json)=>{
      AsyncStorage.setItem('AccessToken', JSON.);
      setIsLoading(false);
    }).catch((e : any) =>{
      setError((e as Error).message)
      setIsLoading(false);
    })
    // Auth.signIn(formData.email, formData.password)
    //   .then(() => {
    //     setIsLoading(false);
    //   })
    //   .catch(err => {
    //     setError(err.message);
    //     setIsLoading(false);
    //   });
  };

  return (
    <View style={componentStyles.container}>
      <Stack space={8} paddingX={4}>
        <Stack space={2}>
          <Text h3 style={componentStyles.title}>
            {t('login.title')}
          </Text>
          <Text style={componentStyles.subtitle}>{t('login.subtitle')}</Text>
        </Stack>

        <Stack space={8}>
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
            }}
            render={({field: {onChange, value}}) => (
              <Input
                label={<Text>{t('form.password.label')}</Text>}
                placeholder={t('form.password.placeholder')}
                leftIcon={<Icon name="key" type="feather" size={20} />}
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
          title={t('common.login')}
          size="lg"
          loading={isLoading}
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
        />

        <Inline space={2} alignX="center">
          <Text>{t('login.no_account')}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}>
            <Text style={[{fontWeight: 'bold'}, styles.textPrimary]}>
              {t('common.register')}
            </Text>
          </TouchableOpacity>
        </Inline>

        {/* <SocialSignIn /> */}
      </Stack>
    </View>
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
  },
});

export default LoginScreen;


