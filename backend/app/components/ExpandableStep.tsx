import {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import colors from '@/config/colors';


export default function ExpandableStep({title, text}: {title: string; text: string}) {
    const [expanded, setExpanded] = useState(false);


    return (
        <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle" style={{ color: colors.secondary }}>
                {title}
            </ThemedText>
            <ThemedText
                style={{ color: colors.text }}
                numberOfLines={expanded ? undefined : 1} // limit to 1 line when collapsed
            >
                {text}
            </ThemedText>

            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <ThemedText type="link" style={styles.readMore}>
                {expanded ? 'Read less' : 'Read more'}
                </ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 8, 
        marginBottom: 8, 
        backgroundColor: colors.background,
        padding: 12, 
        borderRadius: 8, 
        borderColor: colors.border,
        borderWidth: 1,
    },
    readMore: {
        marginTop: 4, 
        color: colors.info, 
        textDecorationLine: 'underline',
    },
});
