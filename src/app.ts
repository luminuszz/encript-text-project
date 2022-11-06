import inquirer from "inquirer";

class Main {
  private async makeQuestions() {
    return inquirer.prompt([
      {
        type: "input",
        name: "secret",
        message: "input your secret",
      },

      {
        type: "input",
        name: "value",
        message: "input your value",
      },
    ]);
  }

  public async ignite() {
    const questions = await this.makeQuestions();

    console.log({ questions });
  }
}

export default Main;
