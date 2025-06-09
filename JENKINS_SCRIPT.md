pwd
export PATH=$PATH:/opt/nvm/versions/node/v24.1.0/bin
echo nodejs is `nodejs -v`
echo npm is `npm -v`
echo $BUILD_NUMBER
pwd
mkdir $BUILD_NUMBER
cd $BUILD_NUMBER
git clone https://github.com/adligo/tests4ts_example.ts.adligo.org
cd tests4ts_example.ts.adligo.org

#
# If on the Jenkins build use this;
npm i
npm run buildAndTestWithCoverageUnix

#
# Then publish test reports with this path;
# 
$BUILD_NUMBER/tests4ts_example.ts.adligo.org/**build/test-reports/*.xml