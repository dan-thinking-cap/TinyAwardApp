import React, { useEffect, useState } from 'react'
import useNavigation from '../../../hooks/useNavigation'
import { useRoute } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../../store'
import { Pressable, Text, View } from 'react-native'
import screenNames from '../../../global/screenNames'
import SafeAreaView from '../../../components/safeAreaView'
import LinearGradient from 'react-native-linear-gradient'
import Tiny from '../../../assets/icons/tinyAwardsLogoCollapsed.svg'
import Arrow from '../../../assets/icons/arrowForward.svg'
import { styles } from './Styles'
import strings from '../../../global/strings'
import colors from '../../../global/colors'
import { ScrollView } from 'react-native-gesture-handler'
import PrimaryGradientButton from '../../../components/GradientButton/PrimaryGradientButton'
import Unselected from '../../../assets/icons/radioOutline.svg'
import Selected from '../../../assets/icons/radioSelected.svg'
import Success from '../../../assets/icons/radioSelectedCorrect.svg'
import Failed from '../../../assets/icons/radioSelectedWrong.svg'
import CheckSuccess from '../../../assets/icons/modifier_CheckedSuccess.svg'
import CheckFailed from '../../../assets/icons/modifier_CheckedFailed.svg'
import UncheckBox from '../../../assets/icons/modifier_Unchecked.svg'
import CheckedBox from '../../../assets/icons/modifier_Checked.svg'
import DragAndDrop from '../../../components/dragAndDrop/DragAndDrop'
import { updateTaskStatus } from '../../../store/thunk/dashbaord'
import { setReadStatus } from '../../../store/slice/user.slice'

const Question = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { userID, userName } = useAppSelector(state => state.user)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [selectedOptions, setSelectedOptions] = useState<number[]>([])
    const [isMultiAnswer, setIsMultiAnswer] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLast, setIsLast] = useState(false)
    const [canRetake, setCanRetake] = useState(false)
    const [quizAnswers, setQuizAnswers] = useState([])
    const [isFinished, setIsFinished] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [questionChoices, setQuestionChoices] = useState([])
    const {
        questions,
        percentage,
        type,
        task,
        badge,
        badgeData,
        givenData,
    } = (route?.params as any) || {}

    const dispatch = useAppDispatch()

    const handleBack = (retry = false) => {
        resetAnswers()
        setIsFinished(false)
        setCurrentQuestion(0)
        setQuizAnswers([])
        if (!retry) navigation.push(screenNames.awardDetails, { data: givenData })
    }

    const evaluateAnswers = (options) => {
        const correctAnswers = getCorrectAnswers(options)
        const { feedback } = questions[currentQuestion]
        let correct = false;
        if (isMultiAnswer) {
            // Checks if both arrays are the same length and contain the same elements
            const sortedCorrect = [...correctAnswers].sort();
            const sortedSelected = [...selectedOptions].sort();
            correct = sortedCorrect.length === sortedSelected.length &&
                sortedCorrect.every((val, index) => val === sortedSelected[index]);
        } else if (correctAnswers[0] === selectedOptions[0]) {
            // Single-answer check
            correct = true
        }
        if (correct) {
            setIsCorrect(true)
            setFeedback(handleHtmlTxt(feedback.correct))
        } else {
            setFeedback(handleHtmlTxt(feedback.incorrect))
        }
        if (correct || (!correct && !canRetake)) {
            const { id } = questions[currentQuestion]
            if ((currentQuestion + 1 === questions.length)) {
                setIsLast(true)
            }
            setQuizAnswers((prev) => {
                const answerObj = {
                    questionId: id,
                    isCorrect: correct,
                }
                return [...prev, answerObj]
            })
        }
        setHasSubmitted(true)
    }

    async function handleCompletedTask({ userID, task, type }: any) {
        const request = { userID, task, type, badge };
        try {
            const { response, error } = await updateTaskStatus(request);
            // console.log(response, error)
            if (response?.success) {
                dispatch(setReadStatus(false));
                navigation.replace(screenNames.success, {
                    data: badgeData,
                    userID,
                    badge,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }


    const scoreQuiz = () => {
        const correctAnswers = quizAnswers.filter((answer) => answer.isCorrect)
        const score = Math.round((correctAnswers.length / questions.length) * 100)
        const passed = score >= percentage

        if (passed) {
            //Send questions to pass
            handleCompletedTask({ userID, task, type, badge });
        } else {
            const result = 'You Failed'
            const resultText = `You did not achieve the passing score of ${percentage}${strings.percentage}`
            return (
                <View style={styles.failWrapper}>
                    <Text
                        style={styles.failedHeader}
                        testID="result"
                        accessibilityLabel="result">
                        {result}
                    </Text>
                    <Text
                        style={styles.failedDescription}
                        testID="resultDescription"
                        accessibilityLabel="resultDescription">{resultText}</Text>
                    <Text testID="achievedScore"
                        style={styles.failedDescription}
                        accessibilityLabel="achievedScore">Your final score is {score?.toFixed(2)}%.</Text>
                    <View style={styles.submitBtnWrapper}>
                        <PrimaryGradientButton
                            title={'Retry'}
                            style={styles.submitBtn}
                            textStyle={styles.submitTxt}
                            textId={'retry'}
                            titleId={'retry'}
                            onPress={() => handleBack(true)}
                        />
                    </View>
                </View>
            )
        }
    }

    const resetAnswers = () => {
        setHasSubmitted(false)
        if (isCorrect) setIsCorrect(false);
        if (selectedOptions.length > 0) setSelectedOptions([]);
        if (isMultiAnswer) setIsMultiAnswer(false)
        if (canRetake) setCanRetake(false)
        if (feedback.length > 0) setFeedback('')
    }

    const handlePress = (options) => {
        if (hasSubmitted) {
            if (isCorrect || (!isCorrect && !canRetake)) { //If the answer is correct, or if it is incorrect and they are not allowed to retake, then move on
                if (isLast) {
                    setIsFinished(true)
                    setIsLast(false)
                } else {
                    setCurrentQuestion(prev => prev + 1) //Go to next question
                }
                setQuestionChoices([])
            }
            resetAnswers() //Clear out old multiple choice answers 
        } else {
            evaluateAnswers(options) //Evaluate question answer
        }
    }

    const handleAnswer = (index) => {
        if (isMultiAnswer) {
            //Add to answer array
            setSelectedOptions(prev =>
                prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index] //If answer is within array then remove it, otherwise add it in
            );
        } else {
            setSelectedOptions([index])
            //Change the value of the initial item to the index value
        }

    }

    const setButtonText = () => {
        return hasSubmitted ?
            isCorrect ?
                isLast ?
                    'Finish' : 'Next'
                :
                canRetake ?
                    'Try Again' : 'Next'
            :
            'Submit'
    }

    const renderAnswer = (option, index) => {
        const { answer, isCorrect } = option
        return (<Pressable onPress={() => handleAnswer(index)} disabled={hasSubmitted} key={answer} style={[
            styles.boxWrapper,
            {
                borderColor:
                    selectedOptions[0] === index && hasSubmitted
                        ? isCorrect
                            ? colors.green
                            : colors.red
                        : colors.white,
            },
        ]}>
            <View style={styles.innerWrapper}>
                <View>
                    {selectedOptions[0] === index ? (
                        hasSubmitted ? (
                            isCorrect ? <Success /> : <Failed />
                        ) : (
                            <Selected />
                        )
                    ) : (
                        <Unselected />
                    )}
                </View>
                <Text
                    style={[
                        styles.optionTxt,
                        {
                            color:
                                selectedOptions[0] === index && hasSubmitted
                                    ? isCorrect
                                        ? colors.green
                                        : colors.red
                                    : colors.white,
                        },
                    ]}
                >
                    {answer}
                </Text>
            </View>
        </Pressable>)
    }

    const renderMultiSelectAnswer = (option, index, options) => {
        const { answer } = option
        const correctAnswers = getCorrectAnswers(options)
        const textStyle = { color: selectedOptions.includes(index) ? 'red' : 'white' };
        return (<Pressable onPress={() => handleAnswer(index)} disabled={hasSubmitted} key={answer}
            style={[
                styles.boxWrapper,
                {
                    borderColor:
                        selectedOptions.includes(index) && hasSubmitted
                            ? correctAnswers.includes(index)
                                ? colors.green
                                : colors.red
                            : colors.white,
                },
            ]}>
            {/* <Text style={textStyle}>{answer}</Text> */}
            <View style={styles.innerWrapper}>
                <View>
                    {selectedOptions.includes(index) ? (
                        hasSubmitted ? (
                            correctAnswers.includes(index)
                                ? <CheckSuccess />
                                : <CheckFailed />
                        ) : (
                            <CheckedBox />
                        )
                    ) : (
                        <UncheckBox />
                    )}
                </View>
                <Text
                    style={[
                        styles.optionTxt,
                        {
                            color:
                                selectedOptions.includes(index) && hasSubmitted
                                    ? correctAnswers.includes(index)
                                        ? colors.green
                                        : colors.red
                                    : colors.white,
                        },
                    ]}
                >
                    {answer}
                </Text>
            </View>
        </Pressable>)
    }

    const getCorrectAnswers = (options) => {
        return options.reduce((acc, answer, i) => {
            if (answer.isCorrect) acc.push(i);
            return acc;
        }, []);
    }

    const handleDragAndDrop = (action, correct) => {
        const { id } = questions[currentQuestion]
        setQuizAnswers((prev) => {
            const answerObj = {
                questionId: id,
                isCorrect: correct,
            }
            return [...prev, answerObj]
        })
        if (action === 'finish') {
            setIsFinished(true)
        } else {
            setCurrentQuestion(prev => prev + 1)
        }
    }

    const renderQuestion = (currentQuestion, questions) => {
        const currentQ = questions[currentQuestion]
        if (!currentQ) return null
        const { questionText: description, type } = currentQ
        const options = questionChoices

        if (type === 'matching') {
            return <View style={styles.middleWrapper}>
                <Text style={styles.mainTitleTxt}>Question {currentQuestion + 1} of {questions.length}</Text>
                <DragAndDrop
                    options={options}
                    questionText={description}
                    onNext={handleDragAndDrop}
                    isLast={currentQuestion + 1 === questions.length}
                    canRetake={currentQ.canRetake}
                    feedback={currentQ.feedback}
                />
            </View>
        } else {
            const choices = options.map((option, i) =>
                isMultiAnswer ? renderMultiSelectAnswer(option, i, options) : renderAnswer(option, i)
            );

            return (<View style={styles.middleWrapper}>
                <Text style={styles.mainTitleTxt}>Question {currentQuestion + 1} of {questions.length}</Text>
                <View key={`${currentQ.id}`}>
                    <Text style={styles.descriptionTxt}>{handleHtmlTxt(description)}</Text>
                    {choices}
                    {feedback.length > 0 && <View style={
                        isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
                    }>
                        <Text>{feedback}</Text>
                    </View>}
                    <View style={styles.submitBtnWrapper}>
                        <PrimaryGradientButton
                            title={handleHtmlTxt(setButtonText())}
                            style={styles.submitBtn}
                            textStyle={styles.submitTxt}
                            textId={'submit'}
                            titleId={'submitTxt'}
                            disable={selectedOptions.length === 0}
                            onPress={() => handlePress(options)}
                        />
                    </View>
                </View>
            </View>)
        }
    }

    const shuffleOptions = (options) => {
        const shuffled = [...options];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    function handleHtmlTxt(html: any) {
        return html
            ?.replace(/<\/?[^>]+(>|$)/g, '')
            ?.replace(/&nbsp;/g, ' ')
            ?.trim()
    }

    useEffect(() => {
        if (!questions?.[currentQuestion]) return;

        const { canRetake: canRetry } = questions[currentQuestion];
        const options = questions[currentQuestion].options || [];
        const isMulti = options.filter(option => option.isCorrect).length > 1; //If there is more than one correct answer then it is a multianswer question

        setCanRetake(!!canRetry);
        setIsMultiAnswer(isMulti);
    });

    useEffect(() => {
        const currentQ = questions[currentQuestion]
        const { randomize } = currentQ
        let { options } = currentQ

        // Randomize if flagged
        if (randomize) {
            options = shuffleOptions(options);
        }

        setQuestionChoices(options)
    }, [questions, currentQuestion])

    return (
        <SafeAreaView style={styles.safeWrapper}>
            <LinearGradient
                colors={[colors.linerBlueGradientOne, colors.linerBlueGradientTwo]}
                style={styles.container}
            >
                <View style={styles.topContainer}>
                    <View>
                        <View style={styles.headerWrapper}>
                            <View style={styles.leftContainer}>
                                <Tiny style={styles.logoWrapper} />
                                <Text style={styles.headerText}>
                                    {`${strings.hi} ${userName}`}
                                </Text>
                            </View>
                            <View style={styles.rightWrappper}>
                                <Pressable onPress={() => handleBack(false)}>
                                    <Arrow />
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <ScrollView
                            bounces={false}
                            contentContainerStyle={styles.scrollwrapper}
                        >
                            {isFinished ? scoreQuiz() : renderQuestion(currentQuestion, questions)}
                        </ScrollView>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default Question



/* 
// -Back button
// -Randomizing the answer order if that is set to true
// -Getting rid of p tag from question Text
// -Styles (Header, button and text styles, option styles)
//     -Styling the gradient button apparently causes the answers to be incorrect, need to fix this
// -Adding drag and drop (Integrate it properly into the new system with the evaluation, as well as showing you the proper feed back and only allowing you to retry if the propery for that is true)
-Finishing the quiz and sending the answers through the function from the old question component, but more importantly making sure the handler for it works and gives you the badge
-Seperating multiple choice into seperate component
// -Question Feedback
*/

