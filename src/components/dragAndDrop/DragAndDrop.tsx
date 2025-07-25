import React, { useState, useCallback, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { getScaledFont } from '../../global/fonts'
import { fonts } from '../../assets'
import colors from '../../global/colors'
import WrapBalancer from 'react-native-wrap-balancer'
import strings from '../../global/strings'

export interface Pair {
    dragzone: string
    dropzone: string
}

export interface DragAndDropProps {
    questionText: string
    options: Pair[]
    onNext?: (string, correct: boolean) => void
    isLast: boolean
    canRetake: boolean
    feedback?: { correct: string, incorrect: string }
}

const downArrow = '\u2193'

const DragAndDrop: React.FC<DragAndDropProps> = ({
    questionText,
    options,
    onNext,
    isLast,
    canRetake,
    feedback
}) => {
    const [items, setItems] = useState<string[]>([])
    const [selected, setSelected] = useState<string | null>(null)
    const [assignments, setAssignments] = useState<Record<string, string>>({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    const pickUp = useCallback((dragText: string) => {
        setSelected(prev => (prev === dragText ? null : dragText))
    }, [])

    const drop = useCallback(
        (dropText: string) => {
            if (!selected) return

            setAssignments(prev => {
                const newAssignments = { ...prev }
                const existing = newAssignments[dropText]
                if (existing) {
                    setItems(prevItems => [...prevItems, existing])
                }
                newAssignments[dropText] = selected
                return newAssignments
            })

            setItems(xs => xs.filter(x => x !== selected))
            setSelected(null)
        },
        [selected]
    )

    const handleReset = useCallback(() => {
        setItems(options.map(p => p.dragzone))
        setAssignments({})
        setSelected(null)
        setHasSubmitted(false)
    }, [options])

    const handleHtmlTxt = (html: any) =>
        html
            ?.replace(/<\/?[^>]+(>|$)/g, '')
            ?.replace(/&nbsp;/g, ' ')
            ?.trim()

    const evaluateAnswers = () => {
        let correctCount = 0;
        options.forEach((assignment) => {
            const dropzoneVal = assignment.dropzone;
            const expectedDrag = assignment.dragzone;
            const assignedDrag = assignments[dropzoneVal] || '';
            if (assignedDrag === expectedDrag) {
                correctCount++;
            }
        });
        if (correctCount === options.length) {
            setIsCorrect(true)
        }
        setHasSubmitted(true)
    }

    const handlePressSubmit = useCallback(() => {
        if (!hasSubmitted) {
            evaluateAnswers()
        } else {
            if (isCorrect) { //If the answer is correct, or if it is incorrect and they are not allowed to retake, then move on
                if (isLast) {
                    onNext('finish', true)
                } else {
                    onNext('next', true)
                }
            } else if(!canRetake){
                if (isLast) {
                    onNext('finish', false)
                } else {
                    onNext('next', false)
                }
            }
            handleReset()
            setIsCorrect(false)
        }
    }, [assignments, onNext, hasSubmitted, isCorrect])




    useEffect(() => {
        setItems(options.map(p => p.dragzone))
    }, [options])

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>
                {handleHtmlTxt(questionText)}
            </Text>
            <View style={styles.quizArea}>
                <View style={[styles.column, styles.stack]}>
                    <View style={styles.items}>
                        {items.map(text => (
                            <TouchableOpacity
                                key={text}
                                style={[
                                    styles.box,
                                    styles.draggableBox,
                                    selected === text && styles.boxSelected,
                                ]}
                                onPress={() => pickUp(text)}
                                disabled={hasSubmitted}
                            >
                                <WrapBalancer>
                                    <Text style={styles.boxText}>{text}</Text>
                                </WrapBalancer>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.arrow}>{downArrow}</Text>
                </View>
                <View style={[styles.column, styles.stack]}>
                    <View style={styles.dropzoneContainer}>
                        {options.map(({ dropzone }) => {
                            const assigned = assignments[dropzone]
                            const isActive = selected && !assigned
                            return (
                                <TouchableOpacity
                                    key={dropzone}
                                    style={[
                                        styles.box,
                                        styles.dropzone,
                                        assigned && styles.hasChild,
                                        isActive && styles.activeZone,
                                    ]}
                                    onPress={() =>
                                        assigned
                                            ? ((): void => {
                                                setAssignments(prev => {
                                                    const copy = { ...prev }
                                                    delete copy[dropzone]
                                                    return copy
                                                })
                                                setItems(prev => [...prev, assigned])
                                                if (selected) drop(dropzone)
                                            })()
                                            : drop(dropzone)
                                    }
                                    disabled={hasSubmitted}
                                >
                                    <Text style={styles.dropzoneText}>
                                        {assigned || dropzone}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>
            {feedback && hasSubmitted && <View style={
                isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
            }>
                <Text>{isCorrect ? handleHtmlTxt(feedback.correct) : handleHtmlTxt(feedback.incorrect)}</Text>
            </View>}
            <View style={styles.btnContainer}>
                {(!hasSubmitted || hasSubmitted && !isCorrect && canRetake) && <TouchableOpacity
                    style={[styles.btn, styles.resetBtn]}
                    onPress={handleReset}
                    disabled={items.length === options.length}
                >
                    <Text style={styles.btnTxt}>{hasSubmitted && !isCorrect && canRetake ? strings.tryAgain : 'Reset'}</Text>
                </TouchableOpacity>}
                {(!hasSubmitted || isCorrect || (hasSubmitted && !isCorrect && !canRetake)) && <TouchableOpacity
                    style={[
                        styles.btn,
                        items.length !== 0 ? styles.submitBtnDisabled : styles.submitBtn,
                    ]}
                    onPress={handlePressSubmit}
                    disabled={items.length !== 0}
                >
                    <Text style={styles.btnTxt}>{hasSubmitted && (isCorrect || !canRetake) 
                        ? isLast
                            ? strings.finish
                            : strings.continue
                        : strings.submit}</Text>
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const BOX_SIZE = 100

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    questionText: {
        fontSize: getScaledFont(28),
        fontFamily: fonts.semiBold,
        color: colors.white,
    },
    quizArea: { flexDirection: 'column', justifyContent: 'center', marginTop: 16 },
    column: { flexDirection: 'column', alignItems: 'center', marginTop: 16 },
    stack: { minWidth: BOX_SIZE },
    arrow: { verticalAlign: 'top', fontSize: 70, color: colors.white },
    items: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        minHeight: 150,
        gap: 10,
    },
    dropzoneContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    box: {
        width: BOX_SIZE,
        height: BOX_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#15023D',
        borderWidth: 1,
        borderColor: 'white',
    },
    boxText: { textAlign: 'center', color: 'white', fontSize: 14 },
    draggableBox: { padding: 8 },
    boxSelected: { transform: [{ scale: 1.1 }], zIndex: 1000 },
    dropzone: {
        backgroundColor: 'rgba(249,249,249,0.06)',
        borderStyle: 'dashed',
        borderColor: '#ccc',
    },
    dropzoneText: { color: '#aaa', position: 'absolute', textAlign: 'center', fontSize: 14 },
    activeZone: {
        borderColor: 'white',
        backgroundColor: 'rgba(231,241,255,0.25)',
    },
    hasChild: { padding: 0, backgroundColor: '#15023D', borderColor: 'white' },
    btnContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
    btn: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 4 },
    resetBtn: { backgroundColor: '#6c757d' },
    submitBtn: { backgroundColor: '#007bff' },
    submitBtnDisabled: { backgroundColor: '#999' },
    btnTxt: { color: 'white', fontWeight: '600' },
    feedbackCorrect: {
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        marginVertical: 8,
    },
    feedbackIncorrect: {
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        marginVertical: 8,
    },
})

export default DragAndDrop
