

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller, middleware } = app;
  const apiRouter = app.router.namespace('/api');

  const { sign, user, drama, upload, clue, role, timeLine, material, preview } = controller;

  apiRouter.post('/sign/signup', sign.signup);
  apiRouter.post('/sign/resetPassword', sign.resetPassword);
  apiRouter.post('/sign/login', sign.login);
  apiRouter.post('/sign/signout', sign.signout);
  apiRouter.get('/user/getUserInfo', user.getUserInfo);

  apiRouter.get('/drama/getDramaList', drama.getDramaList);
  apiRouter.get('/drama/getDramaBasicInfo', drama.getDramaBasicInfo);


  apiRouter.post('/drama/saveDarma', drama.saveDarma);
  apiRouter.get('/drama/getDramaDetail', drama.getDramaDetail);

  apiRouter.get('/drama/getAllDramaChapterList', drama.getAllDramaChapterList);
  apiRouter.get('/drama/getBasicDramaChapterList', drama.getBasicDramaChapterList);
  apiRouter.get('/drama/getDramaChapterList', drama.getDramaChapterList);
  apiRouter.get('/drama/getBasicDramaChapterDetail', drama.getBasicDramaChapterDetail);
  apiRouter.get('/drama/getDramaChapterDetail', drama.getDramaChapterDetail);

  apiRouter.get('/preview/getPreview', preview.getPreview);
  apiRouter.get('/preview/getAllPreviewContent', preview.getAllPreviewContent);


  apiRouter.post('/upload/uploadImage', upload.uploadImage);
  apiRouter.post('/upload/uploadWord', upload.uploadWord);
  apiRouter.post('/upload/uploadPackage', upload.uploadPackage);
  apiRouter.post('/upload/uploadPreviewDocx', upload.uploadPreviewDocx);


  apiRouter.post('/drama/saveBasicDramaChapter', drama.saveBasicDramaChapter);
  apiRouter.post('/drama/saveDramaChapter', drama.saveDramaChapter);
  apiRouter.post('/drama/updateDramaState', drama.updateDramaState);

  apiRouter.post('/drama/saveDramaGroupChapter', drama.saveDramaGroupChapter);


  apiRouter.get('/clue/getCluePageList', clue.getCluePageList);
  apiRouter.post('/clue/saveClue', clue.saveClue);
  apiRouter.get('/clue/getClueGroupList', clue.getClueGroupList);
  apiRouter.get('/clue/getClueListByGroupId', clue.getClueListByGroupId);
  apiRouter.post('/clue/updateClueGroupState', clue.updateClueGroupState);

  apiRouter.post('/role/saveDramaRole', role.saveDramaRole);
  apiRouter.get('/role/getDramaRolePageList', role.getDramaRolePageList);
  apiRouter.get('/role/getDramaRoleRelationList', role.getDramaRoleRelationList);
  apiRouter.post('/role/saveDramaRoleRelation', role.saveDramaRoleRelation);
  apiRouter.post('/role/updateDramaRoleState', role.updateDramaRoleState);
  apiRouter.post('/role/updateDramaRoleRelationState', role.updateDramaRoleRelationState);

  apiRouter.get('/timeLine/getTimeLineList', timeLine.getTimeLineList);
  apiRouter.post('/timeLine/saveTimeLine', timeLine.saveTimeLine);
  apiRouter.post('/timeLine/dragTimeLine', timeLine.dragTimeLine);


  apiRouter.get('/material/getMaterialList', material.getMaterialList);
  apiRouter.post('/material/saveMaterial', material.saveMaterial);


};
