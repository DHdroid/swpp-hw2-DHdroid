import axios from "axios";
import * as actionCreators from "./action";
import store from "../store";
import { JestEnvironment } from "@jest/environment";

const stubArticle = {
  id: 20,
  author_id: 1,
  title: "ReactJS Testing",
  content:
    "Jest is a delightful JavaScript Testing Framework with a focus on simplicity."
};
const stubUser = {
  id: 1,
  email: "swpp@snu.ac.kr",
  password: "iluvswpp",
  name: "Software Lover",
  logged_in: false
};
const stubComment = {
  id: 20,
  article_id: 20,
  author_id: 3,
  content: "Tornado has hit our town"
};

const stubComment2 = {
  id: 20,
  article_id: 21,
  author_id: 3,
  content: "Tornado has hit our town"
};
describe("ActionCreators", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should post article correctly', (done)=> {
    const spy = jest.spyOn(axios, "post").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticle
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.postArticle(stubArticle)).then(() => {
      const newState = store.getState();
      expect(newState.ar.articles).toEqual([stubArticle]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  })
  it('should post comment correctly', (done)=> {
    const spy = jest.spyOn(axios, "post").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubComment
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.postComment(stubComment)).then(() => {
      const newState = store.getState();
      expect(newState.dr.comments).toEqual([stubComment]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  })
  it('should delete comment correctly', (done)=> {
    const spy = jest.spyOn(axios, "delete").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubComment
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.deleteComment(stubComment.id)).then(() => {
      const newState = store.getState();
      expect(newState.dr.comments).toEqual([]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  })
  it('should delete article correctly', (done)=> {
    const spy = jest.spyOn(axios, "delete").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticle
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.deleteArticle(20)).then(() => {
      const newState = store.getState();
      expect(newState.dr.article).toEqual({});
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  })
  it('should login correctly', (done)=> {
    const spy = jest.spyOn(axios, "patch").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: null
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.login()).then(() => {
      const newState = store.getState();
      expect(newState.lr.login).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  })
  it('should logout correctly', (done)=> {
    const spy = jest.spyOn(axios, "patch").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: null
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.logout()).then(() => {
      const newState = store.getState();
      expect(newState.lr.login).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  })
  it(`  should fetch articles correctly`, done => {
    const stubArticleList = [stubArticle];

    const spy = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticleList
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getArticles()).then(() => {
      const newState = store.getState();
      expect(newState.ar.articles).toBe(stubArticleList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`  should fetch users correctly`, done => {
    const stubUsers = [stubUser];

    const spy = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUsers
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getUsers()).then(() => {
      const newState = store.getState();
      expect(newState.ar.users).toBe(stubUsers);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`  should fetch article correctly`, done => {
    const spy = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticle
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getArticle()).then(() => {
      const newState = store.getState();
      expect(newState.dr.article).toBe(stubArticle);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`  should fetch comments correctly`, done => {
    const stubComments = [stubComment, stubComment2];

    const spy = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubComments
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getComments(20)).then(() => {
      const newState = store.getState();
      console.log(newState.dr);
      expect(newState.dr.comments).toEqual([stubComment]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`should get login correctly`, done => {
    const spy = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: {logged_in:true}
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getlogin()).then(() => {
      const newState = store.getState();
      expect(newState.lr.login).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`should edit article correctly`, done => {
    const spy = jest.spyOn(axios, "put").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data:null
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.editArticle(stubArticle)).then(() => {
      const newState = store.getState();
      expect(newState.dr.article).toEqual(stubArticle);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`should edit comment correctly`, done => {
    const spy = jest.spyOn(axios, "put").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data:null
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.editComment(stubComment)).then(() => {
      const newState = store.getState();
      expect(newState.dr.comments).toEqual([stubComment]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

});
