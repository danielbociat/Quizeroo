import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import back from '../../Images/back.png';
import CustomTitle from '../../components/CustomTitle';
import QuizQuestionCustom from '../../components/QuizQuestionCustom';
import AddButton from '../../components/AddButton';
import CreateQuizButton from '../../components/CreateQuizButton';
import LeftArrow from '../../components/LeftArrow';
import RightArrow from '../../components/RightArrow';
import {useState} from 'react';
import quizImage from '../../Images/quizImage.png';
import {apiUrl} from '../../storage/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateQuiz = ({navigation}) => {
  const [step, setStep] = useState(0);
  const [quiz, setQuiz] = useState({
    name: '',
    questions: [],
  });

  const generateNewQuestion = () => {
    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, {answer: '', a: '', b: '', c: ''}],
    }));
  };

  const handleSubmitQuiz = async () => {
    var questionsBody = quiz.questions.map(q => ({
      questionText: q.questionText,
      answers: [
        {
          answerText: q.answer,
          isCorrect: true,
        },
        {
          answerText: q.a,
          isCorrect: false,
        },
        {
          answerText: q.b,
          isCorrect: false,
        },
        {
          answerText: q.c,
          isCorrect: false,
        },
      ],
    }));
    var quizBody = JSON.stringify({title: quiz.name, questions: questionsBody});

    const token = await AsyncStorage.getItem('token');
    await fetch(apiUrl + 'quiz', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: quizBody,
    })
      .then(response => {
        if (response.ok) navigation.navigate('MainPage');
        else throw response;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const completedQuestion = q =>
    q.questionText !== undefined &&
    q.questionText !== '' &&
    q.answer !== '' &&
    q.a !== '' &&
    q.b !== '' &&
    q.c !== '';
  const emptyQuestion = q =>
    (q.questionText == undefined || q.questionText == '') &&
    q.answer == '' &&
    q.a == '' &&
    q.b == '' &&
    q.c == '';
  const isQuizCompleted = () => {
    return quiz.questions.every(completedQuestion);
  };

  const isFinalQuestionCompleted = step => {
    return (
      step > 0 &&
      quiz.questions[step - 1].questionText !== undefined &&
      quiz.questions[step - 1].questionText !== '' &&
      quiz.questions[step - 1].answer !== '' &&
      quiz.questions[step - 1].a !== '' &&
      quiz.questions[step - 1].b !== '' &&
      quiz.questions[step - 1].c !== ''
    );
  };

  const handleNextStep = () => {
    if (step === quiz.questions.length) generateNewQuestion();
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (emptyQuestion(quiz.questions[quiz.questions.length - 1]))
      quiz.questions.pop();

    setStep(prev => prev - 1);
  };

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground source={quizImage} style={styles.background}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={back} style={styles.image}></Image>
          </Pressable>
          {step === 0 && (
            <>
              <Text style={styles.title}>Quizz name: </Text>
              <CustomTitle
                value={quiz.name}
                setValue={val => setQuiz(prev => ({...prev, name: val}))}
              />
              <AddButton onPress={() => handleNextStep()} />
            </>
          )}

          {step !== 0 && (
            <>
              <Text style={styles.add}>Add your questions:</Text>
              <QuizQuestionCustom
                quiz={quiz}
                setQuiz={setQuiz}
                step={step - 1}
              />
            </>
          )}
        </View>
        <View style={styles.view2}>
          {step !== 0 && (
            <>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <LeftArrow onPress={() => handlePrevStep()} />
                <CreateQuizButton
                  disabled={!isQuizCompleted()}
                  onPress={() => handleSubmitQuiz()}
                />
                <RightArrow
                  disabled={!isFinalQuestionCompleted(step)}
                  onPress={() => handleNextStep()}
                />
              </View>
            </>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    marginTop: 25,
    marginLeft: 10,
    height: 30,
    width: 30,
  },
  Custom: {
    marginTop: 40,
  },
  title: {
    fontSize: 38,
    padding: 26,
    fontWeight: 'bold',
    color: 'black',
    alignText: 'center',
    paddingLeft: 90,
  },
  add: {
    fontSize: 26,
    padding: 30,
    paddingTop: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  view: {
    backgroundColor: 'white',
    resizeMode: 'contain',
    flex: 1,
    justifyContent: 'space-between',
  },
  background: {
    height: '100%',
    resizeMode: 'cover',
  },
});
export default CreateQuiz;
