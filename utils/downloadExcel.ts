// import axios from 'axios';
// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';
// import { Alert } from 'react-native';

// interface DownloadExcelProps {
//   baseUrl: string;
//   mode: string;
//   username: string | undefined;
// }

// export const downloadTaskExcel = async ({ baseUrl, mode, username }: DownloadExcelProps) => {
//   try {
//     const response = await axios.get(`${baseUrl}/api/tasks/export`, {
//       params: { mode, username },
//       responseType: 'arraybuffer', // Required for binary data
//     });

//     const now = new Date();
//     const dd = String(now.getDate()).padStart(2, '0');
//     const mm = String(now.getMonth() + 1).padStart(2, '0');
//     const yy = String(now.getFullYear()).slice(-2);
//     const hh = String(now.getHours()).padStart(2, '0');
//     const min = String(now.getMinutes()).padStart(2, '0');

//     const fileName = `${mode}task_${dd}_${mm}_${yy}_${hh}_${min}.xlsx`;
//     const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

//     // Convert response to base64
//     const base64Data = Buffer.from(response.data, 'binary').toString('base64');

//     // Save to file
//     await FileSystem.writeAsStringAsync(fileUri, base64Data, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     // Share the file
//     if (await Sharing.isAvailableAsync()) {
//       await Sharing.shareAsync(fileUri, {
//         mimeType:
//           'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         dialogTitle: 'Share Task Excel File',
//       });
//     } else {
//       Alert.alert('Sharing not available', 'Cannot share files on this device.');
//     }
//   } catch (err) {
//     console.error('Download failed', err);
//     Alert.alert('Download failed', 'Something went wrong while exporting the file.');
//   }
// };


import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

interface DownloadExcelProps {
  baseUrl: string;
  mode: string;
  username: string | undefined;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return global.btoa(binary); // base64 encoding
}

export const downloadTaskExcel = async ({ baseUrl, mode, username }: DownloadExcelProps) => {
  try {
    const response = await axios.get(`${baseUrl}/api/tasks/export`, {
      params: { mode, username },
      responseType: 'arraybuffer', // Important for binary Excel
    });

    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');

    const fileName = `${mode}task_${dd}_${mm}_${yy}_${hh}_${min}.xlsx`;
    const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

    const base64Data = arrayBufferToBase64(response.data);

    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'Share Task Excel File',
      });
    } else {
      Alert.alert('Sharing not available', 'Cannot share files on this device.');
    }
  } catch (err) {
    console.error('Download failed', err);
    Alert.alert('Download failed', 'Something went wrong while exporting the file.');
  }
};

