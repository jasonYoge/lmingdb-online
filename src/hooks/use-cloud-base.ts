import cloudbase from '@cloudbase/js-sdk'

const app = cloudbase.init({
  env: 'lmingdb-2gfglj1s626cc70f'
});
const auth = app.auth({
  persistence: 'local'
});

export function useCloudBase() {
  return {
    _app: app,
    auth,
    async login() {
      return auth.signInAnonymously();
    },
    async upload(filename: string, content: Blob, onProgress: (p: { loaded: number, total: number }) => void) {
      return app.uploadFile({
        cloudPath: filename,
        filePath: (new File([content], filename, { type: 'application/pdf' })) as any,
        onUploadProgress: onProgress
      });
    },
    async downloadFile(fileID: string) {
      return app.getTempFileURL({
        fileList: [`cloud://lmingdb-2gfglj1s626cc70f.6c6d-lmingdb-2gfglj1s626cc70f-1251844431/湖南省华湘仕工程担保有限公司_${fileID}.pdf`]
      });
    }
  }
}