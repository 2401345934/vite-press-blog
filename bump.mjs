#!/usr/bin/env zx
/**
 * * 自动升级版本号并打标签 *
 * 相当于修改package.json里面version字段值，然后git commit -m 'xxx'，再git tag -a ${version}
 * */
 
// https://github.com/google/zx
import 'zx/globals'
const filename = './package.json'
const { version } = require(filename)
const prompts = require('prompts')
console.log(chalk.blue('Long long ago, there is a tiger.'))
console.log('Current version: ' + version)
const [major, minor, patch] = version.split('.')
const nextMajor = String(Number(major) + 1) + '.0.0'
const nextMinor = major + '.' + String(Number(minor) + 1) + '.0'
const nextPatch = major + '.' + minor + '.' + String(Number(patch) + 1)
const sourcePatch = major + '.' + minor + '.' + patch
const questions = [
  {
    type: 'select',
    name: 'version',
    message: 'Which part do you want to bump? ',
    choices: [
      { title: 'no-change: ' + sourcePatch, value: sourcePatch },
      { title: 'patch: ' + nextPatch, value: nextPatch },
      { title: 'minor: ' + nextMinor, value: nextMinor },
      { title: 'major: ' + nextMajor, value: nextMajor },
    ],
  },
]
const response = await prompts(questions)
const newVersion = response.version
if (newVersion) {
  const data = await fs.readFile(filename)
  const content = String(data).replace(`"version": "${version}"`, `"version": "${newVersion}"`)
  await fs.writeFile(filename, content)
  console.log(chalk.green('`package.json` updated!'))
}
if (response.commit) {
  let message = response.message
  if (message === '') {
    message = `Bump version: ${version} → ${newVersion}`
  }
  if (message) {
    // console.log(`git add . && git commit -m '${message}'`)
    await $`git add . && git commit -m ${message}`
    if (response.tag) {
      const tag = 'v' + newVersion
      // console.log(`git tag -a ${tag} -m ''`)
      await $`git tag -a ${tag} -m ''`
      await $`git push && git push --tags`
    }
  } else {
    // message === undefined的情况
    console.log(chalk.yellow('I can see the first leaf falling.'))
  }
}