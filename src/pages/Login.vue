<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import { requestLogin } from '../api/api';
  import NProgress from 'nprogress'
  // Import Crypto JS for Twitter OAuth request signing
  import hmac_sha1 from 'crypto-js/hmac-sha1'
  import encode_base64 from 'crypto-js/enc-base64'
//  import CryptoJS from 'crypto-js/core';
  import CryptoJS from 'crypto-js';
  import AES from 'crypto-js/aes';
  import MD5 from 'crypto-js/md5';
  import ECB from 'crypto-js/mode-ecb';
  import SHA256  from 'crypto-js/sha256';
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '13798342221',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            NProgress.start();
            var loginParams = {
                phone_number: this.ruleForm2.account,
                password: this.ruleForm2.checkPass,
                phone_uuid:localStorage['phone_uuid']||'qazxswedc',
                time_stamp:String(Math.round(new Date().getTime()/1000)),
                random_str:String(Math.floor(Math.random() * (100000-10000+1) + 10000)),
                encryption_str:''
            };
            var sha256 = CryptoJS.algo.SHA256.create();
            sha256.update(loginParams.password);
            sha256.update(loginParams.random_str);
            sha256.update(loginParams.time_stamp);
            loginParams.encryption_str = sha256.finalize().toString();

            this.$http.post('/login',loginParams).then(response => {
                // success callback
                this.logining = false;
                NProgress.done();
                sessionStorage.setItem('user', JSON.stringify(response.data));
                console.log(response.data)
                console.log(sessionStorage.getItem('user'))
                //let { active, code, message,nickname,token } = response.data;
                //sessionStorage.setItem('user', JSON.stringify(user)); //从一个对象解析出字符串
                this.$router.push({ path: '/table' });
            }, response => {
                // error callback
                this.logining = false;
                NProgress.done();
                let { active, code, message,nickname,token } = response.data;
                this.$notify({
                    title: '错误',
                    message: msg,
                    type: 'error'
                });
            });
//            requestLogin(loginParams).then(data => {
//              this.logining = false;
//              NProgress.done();
//              let { msg, code, user } = data;
//              if (code !== 200) {
//                this.$notify({
//                  title: '错误',
//                  message: msg,
//                  type: 'error'
//                });
//              } else {
//                sessionStorage.setItem('user', JSON.stringify(user));
//                this.$router.push({ path: '/table' });
//              }
//            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 180px auto;
    border: 2px solid #8492A6;
    width: 350px;
    padding: 35px 35px 15px 35px;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>