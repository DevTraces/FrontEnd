const visitURL = (url: string) => {
  cy.visit(url);
};

const addImage = (fileName: string) => {
  cy.get("input[type='file']").selectFile(fileName, { force: true });
};

const removeImage = (index: number) => {
  cy.get("img[alt='이미지 미리보기']").eq(index).prev().click();
};

const fillContent = (content: string) => {
  cy.get("textarea").type(content);
};

const addTag = (tag: string) => {
  cy.get("input[placeholder='태그 추가']").type(`${tag}{enter}`);
};

const removeTag = (tag: string) => {
  cy.get("button").contains(tag).find("svg").click();
};

const assertHaveTag = (tag: string) => {
  cy.get("button").contains(tag);
};

const assertNotHaveTag = (tag: string) => {
  cy.get("button").contains(tag).should("not.exist");
};

const assertOrderedTag = (tags: string[]) => {
  cy.get("textarea")
    .next()
    .children("button")
    .each(($el, index) => {
      expect($el.text()).to.equal(tags[index]);
    });
};

const assertImagesCount = (count: number) => {
  cy.get("img[alt='이미지 미리보기']").should("have.length", count);
};

const clickButton = (buttonText: string) => {
  cy.get("button").contains(buttonText).click();
};

const assertIncludeURL = (url: string) => {
  cy.url().should("include", url);
};

it("일반적인 사용자 테스트", () => {
  visitURL("http://localhost:3000/post/new");

  clickButton("이미지 추가");
  addImage("cypress/fixtures/assets/sample1.png");
  addImage("cypress/fixtures/assets/sample2.png");
  assertImagesCount(2);
  removeImage(0);
  assertImagesCount(1);

  fillContent("게시글 등록 테스트");

  addTag("태그1");
  assertHaveTag("태그1");

  addTag("태그2");
  assertHaveTag("태그2");

  removeTag("태그2");
  assertNotHaveTag("태그2");

  addTag("태그3");

  assertOrderedTag(["태그1", "태그3"]);

  clickButton("게시하기");

  assertIncludeURL("feed");
});

export {};
