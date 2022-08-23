const fs = require('fs')
const exec = require('child_process').exec

// 读取package.json文件
const packagePath = require('path').resolve(__dirname, '../') + '/package.json'
const packageJSON = require(packagePath)
// 读取package-lock.json文件
const packageLockPath = require('path').resolve(__dirname, '../') + '/package-lock.json'
const packageLockJSON = require(packageLockPath)

const readline = require('readline')

// 填写新版本
const getVersion = () => {
  const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  r.question(`版本号(${packageJSON.version}): `, version => {
    r.close()
    if (version) {
      if (version.split('.').find(v => isNaN(Number(v)))) {
        console.log('版本号输入错误')
        r.close()
        return getVersion()
      } else {
        const newPackageJSON = { ...packageJSON, version }
        fs.writeFileSync(packagePath, JSON.stringify(newPackageJSON, null, 2))
        const newPackageLockJSON = { ...packageLockJSON, version }
        fs.writeFileSync(packageLockPath, JSON.stringify(newPackageLockJSON, null, 2))
        console.log('写入新的版本号: ' + version)
        return pushCommit(version)
      }
    }
    publish()
  })

}
// 提交代码
const pushCommit = version => {
  const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  r.question(`是否推送分支 Y/N: `, push => {
    r.close()
    if (push && push.toLowerCase() === 'y') {
      exec('git add ./dist ' + packagePath + ' ' + packageLockPath, () => {
        exec(`git commit -m "📦 bump version ${version}"`, () => {
          exec('git push', (err, stdout) => {
            if (err) return console.log(err)
            console.log('推送完成', stdout)
            publish()
          })
        })
      })
    } else {
      publish()
    }
  })
}

// 发布
const publish = () => {
  console.log('开始发布')
  const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  r.question(`输入二步认证码: --otp `, code => {
    r.close()
    exec('npm publish --access=public --otp=' + code, (error, stdout) => {
      if (error) {
        console.log(error)
        console.log('发布失败！')
        return process.exit(0)
      }
      console.log(stdout)
      console.log('发布成功！')
      process.exit(0)
    })
  })
}

// 运行测试
const test = (callback) => {
  console.log('运行测试')
  exec('npm run test', (error, stdout) => {
    if (error) {
      console.log(error)
      return
    }
    console.log(stdout)
    callback()
  })
}

const start = async () => {
  test(getVersion)
}

start()
