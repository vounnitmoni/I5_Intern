import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import {Button, Icon, Image, Input, Text} from '@rneui/themed';
import {StackNavigationProp} from '@react-navigation/stack';
import {Controller, useForm} from 'react-hook-form';
import {Stack, Inline} from '@mobily/stacks';
import {useTranslation} from 'react-i18next';
import {ROUTES} from '../../enums/RouteEnum';
import {AuthStackParamList, RootStackParamList} from '../../compoments/Nagivation/TypeNavigation';
import variables from '../../assets/styles/variables';
import styles from '../../assets/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../api';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { circularClick } from '../../store/onClickRecursiveReducer';

type FormValues = {
  username: string;
  password: string;
};

type LoginScreen = StackNavigationProp<AuthStackParamList, ROUTES.LOGIN>;

const LoginScreen: React.FC<{navigation: LoginScreen}> = ({navigation}) => {
  const rootNav = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');
  const action = useAppSelector(state => state.onClickRecursiveReducer.bool)
  const dispatch = useAppDispatch();
  
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
    API.Login({
      username: formData.username,
      password: formData.password,
    }).then(res => res.json())
    .then(async (data) => {
      setData(data)
      setIsLoading(false);
        if(data.accessToken){
          // document.cookie =`attcookie=${data.token}`
          AsyncStorage.setItem("token", data.accessToken);
          // rootNav.navigate(ROUTES.HOME)
        }else{
          Alert.alert("Wrong username and password!")
        }
    })
    .then(()=>{
      if(action == true){
          dispatch(circularClick(false));
      }else{
          dispatch(circularClick(true));
      }
    }).catch(e=> (e as Error).message);
  };

  return (
    <View style={componentStyles.container}>
      <Stack space={8} paddingX={4}>
        <Stack space={2}>
            <Image source={require('./../../assets/images/logo.png')} style={{width: 200, height:100}}/>
        </Stack>
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
              // pattern: {
              //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              //   message: t('error.invalid_email.message'),
              // },
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


