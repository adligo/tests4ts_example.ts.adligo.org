pwd
echo nodejs is `nodejs -v`
echo npm is `npm -v`
echo $BUILD_NUMBER
pwd
mkdir $BUILD_NUMBER
cd $BUILD_NUMBER
git clone https://github.com/adligo/slink_group.ts.adligo.org
cd slink_group.ts.adligo.org

#
# If on the Jenkins build use this;
export USHELL=/usr/bin/bash

npm run git-clone
npm run setup
npm run test

#
# Then publish test reports with this path;
# 
$BUILD_NUMBER/slink_group.ts.adligo.org/junitXml_tests.tests4j.ts.adligo.org/**build/test-reports/*.xml