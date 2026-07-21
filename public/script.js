document.addEventListener("DOMContentLoaded", () => {
  const todoIds = [1, 2, 3, 4, 5];
  const seqBtn = document.getElementById("fetch-seq-btn");
  const parallelBtn = document.getElementById("fetch-parallel-btn");
  const timeSeq = document.getElementById("time-seq");
  const timeParallel = document.getElementById("time-parallel");
  const thenBtn = document.getElementById("then-btn");
  const asyncAwaitBtn = document.getElementById("async-await-btn");
  const testNegativePromiseBtn = document.getElementById(
    "test-negative-promise-btn",
  );
  const testNegativeAsyncAwaitBtn = document.getElementById(
    "test-negative-async-await-btn",
  );
  const promiseAllSettleBtn = document.getElementById("promise-all-settle-btn");
  const promiseSetTimeoutProcessNextTick = document.getElementById(
    "promise-setTimeout-process-nextTick",
  );

  // ========================Task 1a=====================================
  seqBtn.addEventListener("click", async () => {
    const startingTime = performance.now();
    for (const todoId of todoIds) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      );
    }
    const endingTime = performance.now();
    const totalTime = ((endingTime - startingTime) / 1000).toFixed(2);

    timeSeq.textContent = `Time taken: ${totalTime} seconds`;
  });

  parallelBtn.addEventListener("click", async () => {
    const startingTime = performance.now();
    const apiPromises = todoIds.map((todoId) =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`),
    );
    const response = await Promise.all(apiPromises);
    const endingTime = performance.now();
    const totalTime = ((endingTime - startingTime) / 1000).toFixed(2);

    timeParallel.textContent = `Time taken: ${totalTime} seconds`;
  });

  // =====================Task 1b=========================================
  // With promise
  function task1bPromise() {
    const promise1b = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("resolved");
      }, 1000);
    });
    promise1b
      .then((data) => data)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  async function task1bAsyncAwait() {
    const promise1b = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("resolved");
      }, 1000);
    });
    try {
      const result = await promise1b;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  thenBtn.addEventListener("click", () => task1bPromise());
  asyncAwaitBtn.addEventListener("click", () => task1bAsyncAwait());

  // ===========================Task 1c===================================
  // Testing negative number using .then().catch()
  const negativeNumberTestArray = [1, 2, 3, 4, 5, -5];
  function testNegativeWithPromise(numbersArray) {
    const promiseResult = new Promise((resolve, reject) => {
      let sum = 0;
      for (const number of numbersArray) {
        if (number < 0) reject("Negative number");
        sum = sum + number;
      }
      resolve(`The sum is ${sum}`);
    });
    promiseResult
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  async function testNegativeWithAsyncAwait(numbersArray) {
    const promise = new Promise((resolve, reject) => {
      let sum = 0;
      for (const number of numbersArray) {
        if (number < 0) reject("Negative number");
        sum = sum + number;
      }
      resolve(`The sum is ${sum}`);
    });

    try {
      const result = await promise;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  testNegativePromiseBtn.addEventListener("click", () =>
    testNegativeWithPromise(negativeNumberTestArray),
  );
  testNegativeAsyncAwaitBtn.addEventListener("click", () =>
    testNegativeWithAsyncAwait(negativeNumberTestArray),
  );

  // ===================== Task 1d=================================================
  // Using Promise.allSettle and console loging the results.
  async function promiseAllSettleResponse() {
    const promisesResolved = Array.from({ length: 2 }).map(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(`resolved`);
          }, 1000);
        }),
    );
    const promisesRejected = Array.from({ length: 2 }).map(
      (value) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject("rejected");
          }, 1000);
        }),
    );

    const allPromomiseStatuses = await Promise.allSettled([
      ...promisesResolved,
      ...promisesRejected,
    ]);

    console.log(allPromomiseStatuses);
  }

  promiseAllSettleBtn.addEventListener("click", () =>
    promiseAllSettleResponse(),
  );

  // ============================Task 1f==============================================
  async function testAsynOperations() {
    try {
      const result = await fetch("/api/micro-vs-macro");
      result.json().then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
  }

  promiseSetTimeoutProcessNextTick.addEventListener("click", () =>
    testAsynOperations(),
  );

  // ==================================================================================
});
