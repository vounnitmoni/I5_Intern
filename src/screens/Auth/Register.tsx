import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Icon, Input, Text} from '@rneui/themed';
import {StackNavigationProp} from '@react-navigation/stack';
import {Controller, useForm} from 'react-hook-form';
import {Stack, Inline} from '@mobily/stacks';
import {useTranslation} from 'react-i18next';
import {ROUTES} from '../../enums/RouteEnum';
import {AuthStackParamList} from '../../compoments/Nagivation/TypeNavigation';
// import SocialSignIn from '../../compoments/SocialSignIn';
import variables from '../../assets/styles/variables';
import styles from '../../assets/styles';

type FormValues = {
  username: string;
  password: string;
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
      password: undefined,
    },
  });

  const onSubmit = (formData: FormValues) => {
    setIsLoading(true);
    // Auth.signUp({
    //   username: formData.email,
    //   password: formData.password,
    // })
    //   .then(() => {
    //     setIsLoading(false);
    //     navigation.navigate(ROUTES.CONFIRM, {
    //       email: formData.email,
    //     });
    //   }).catch(err => {
    //     setIsLoading(false);
    //     if (err.message) {
    //       setError(err.message);
    //     }
    //   });
  };

  return (
    <ScrollView style={componentStyles.container}>
      <Stack space={8} paddingX={4}>
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
            //   pattern: {
            //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            //     message: t('error.invalid_email.message'),
            //   },
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
