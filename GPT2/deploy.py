from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Init app
app = Flask(__name__)
CORS(app)

model = GPT2LMHeadModel.from_pretrained('NlpHUST/gpt2-vietnamese')
tokenizer = GPT2Tokenizer.from_pretrained('NlpHUST/gpt2-vietnamese')

def GPT2_pretrained_model(text, max_length = 100):
    input_ids = torch.tensor([tokenizer.encode(text)])

    sample_outputs = model.generate(input_ids,
                                    do_sample=True,
                                    max_length=max_length,
                                    min_length=max_length,
                                    top_k=40,
                                    num_beams=5,
                                    early_stopping=True,
                                    no_repeat_ngram_size=2,
                                    num_return_sequences=1)

    return tokenizer.decode(sample_outputs.tolist()[0])

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()['data']
    ouptut = GPT2_pretrained_model(data['input'], int(data['max_length']))
    print(ouptut)
    

# if num_return_sequences > 1:
# do this for all returned sequences
# for i, sample_output in enumerate(sample_outputs):
#     print(">> Generated text {}\n\n{}".format(i+1, tokenizer.decode(sample_output.tolist())))
#     print('\n---')

    return jsonify({'message': ouptut})

if __name__ == '__main__':
    app.run(debug=True)