// import React, {useState, useEffect} from 'react';
// import {Linking} from 'react-native';
// import {Dialog, Text} from '@rneui/themed';
// import remoteConfig from '@react-native-firebase/remote-config';
// import {useTranslation} from 'react-i18next';
// import settings from '../../../config/settings';
// import variables from '../../assets/styles/variables';

// const UpgradeDialog = () => {
//   const {t} = useTranslation();
//   const [visible, setVisible] = useState(false);
//   const [forceUpdate, setForceUpdate] = useState(false);

//   useEffect(() => {
//     remoteConfig().fetch(0).then();

//     remoteConfig()
//       .setDefaults({
//         version_code: settings.versionCode,
//       })
//       .then(() => remoteConfig().fetchAndActivate())
//       .then(() => {
//         const remoteVersionCode = remoteConfig().getValue('version_code');
//         setVisible(settings.versionCode < remoteVersionCode.asNumber());
//       });

//     remoteConfig()
//       .setDefaults({
//         force_update: false,
//       })
//       .then(() => remoteConfig().fetchAndActivate())
//       .then(() => {
//         const remoteForceUpdate = remoteConfig().getValue('force_update');
//         setForceUpdate(remoteForceUpdate.asBoolean());
//       });
//   }, []);

//   return (
//     <Dialog isVisible={visible} statusBarTranslucent>
//       <Dialog.Title
//         title={t('dialog.upgrade.title')}
//         titleStyle={{
//           fontSize: variables.fontSizeMd,
//           color: variables.black,
//         }}
//       />
//       <Text>{t('dialog.upgrade.content')}</Text>

//       <Dialog.Actions>
//         <Dialog.Button
//           title={t('common.update_now')}
//           onPress={() =>
//             Linking.openURL(`market://details?id=${settings.packageName}`)
//           }
//         />

//         {!forceUpdate && (
//           <Dialog.Button
//             title={t('common.later')}
//             onPress={() => setVisible(!visible)}
//           />
//         )}
//       </Dialog.Actions>
//     </Dialog>
//   );
// };

// export default UpgradeDialog;
